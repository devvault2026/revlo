import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

// Audio helpers
function floatTo16BitPCM(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return output;
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export class LiveCoachService {
  private ai: GoogleGenAI;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private nextStartTime = 0;
  private isConnected = false;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async connect(onMessage: (text: string) => void, onError: (err: any) => void) {
    if (this.isConnected) return;

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Configuration for the coach
    const config = {
      model: "gemini-2.5-flash-native-audio-preview-12-2025",
      config: {
        responseModalities: [Modality.AUDIO],
        systemInstruction: `You are a world-class Sales Coach listening to a live cold call. 
        Your user is the Sales Representative. 
        Listen to the user speaking. 
        Your goal is to provide concise, high-impact advice to help the user close the deal, handle objections, or build rapport.
        Speak briefly and directly to the user. Do not simulate the prospect. Be encouraging but tactical.
        If the user is silent, wait.`,
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    };

    const sessionPromise = this.ai.live.connect({
      ...config,
      callbacks: {
        onopen: () => {
          console.log("Coach Connected");
          this.isConnected = true;
          this.startAudioInputStream(sessionPromise);
        },
        onmessage: async (msg: LiveServerMessage) => {
          // Handle Audio Output from Coach
          const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioData && this.audioContext) {
            const rawBytes = base64ToUint8Array(audioData);
            // Decode audio (simple PCM decoding for 24k rate 1 channel)
            const audioBuffer = await this.decodeAudio(rawBytes);
            this.playAudio(audioBuffer);
          }
          
          // If there is a turn complete or transcription, we could surface text.
          // For now, we rely on audio feedback.
        },
        onclose: () => {
          console.log("Coach Disconnected");
          this.isConnected = false;
        },
        onerror: (err) => {
          console.error("Coach Error", err);
          onError(err);
        }
      }
    });
  }

  private startAudioInputStream(sessionPromise: Promise<any>) {
    if (!this.audioContext || !this.mediaStream) return;

    // Create 16kHz context for input (Gemini standard)
    const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    this.source = inputContext.createMediaStreamSource(this.mediaStream);
    this.processor = inputContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const pcm16 = floatTo16BitPCM(inputData);
      const base64 = arrayBufferToBase64(pcm16.buffer);

      sessionPromise.then(session => {
        session.sendRealtimeInput({
          media: {
            mimeType: "audio/pcm;rate=16000",
            data: base64
          }
        });
      });
    };

    this.source.connect(this.processor);
    this.processor.connect(inputContext.destination);
  }

  private async decodeAudio(data: Uint8Array): Promise<AudioBuffer> {
     if (!this.audioContext) throw new Error("No Audio Context");
     // Raw PCM 16-bit 24kHz
     const dataInt16 = new Int16Array(data.buffer);
     const buffer = this.audioContext.createBuffer(1, dataInt16.length, 24000);
     const channelData = buffer.getChannelData(0);
     for(let i=0; i<dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
     }
     return buffer;
  }

  private playAudio(buffer: AudioBuffer) {
    if (!this.audioContext) return;
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    
    const now = this.audioContext.currentTime;
    // Schedule next chunk
    const start = Math.max(now, this.nextStartTime);
    source.start(start);
    this.nextStartTime = start + buffer.duration;
  }

  disconnect() {
    this.isConnected = false;
    this.processor?.disconnect();
    this.source?.disconnect();
    this.mediaStream?.getTracks().forEach(t => t.stop());
    this.audioContext?.close();
    // No explicit session.close in SDK currently exposed easily on the promise, 
    // but stopping input/output effectively kills the session from client side logic.
  }
}