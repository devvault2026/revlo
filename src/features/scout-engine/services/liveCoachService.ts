import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

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

    // ELITE 2.5 NATIVE AUDIO MODEL
    const config = {
      model: "gemini-2.0-flash-exp",
      config: {
        responseModalities: [Modality.AUDIO],
        systemInstruction: `You are the REVOLO ELITE SALES COACH. 
        Listen to the live cold call. Provide high-octane, tactical advice to help the rep close.
        Concise. Aggressive. Tactical.`,
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    };

    const sessionPromise = this.ai.live.connect({
      ...config,
      callbacks: {
        onopen: () => {
          this.isConnected = true;
          this.startAudioInputStream(sessionPromise);
        },
        onmessage: async (msg: LiveServerMessage) => {
          const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioData && this.audioContext) {
            const rawBytes = base64ToUint8Array(audioData);
            const audioBuffer = await this.decodeAudio(rawBytes);
            this.playAudio(audioBuffer);
          }
        },
        onclose: () => {
          this.isConnected = false;
        },
        onerror: (err) => {
          onError(err);
        }
      }
    });
  }

  private startAudioInputStream(sessionPromise: Promise<any>) {
    if (!this.audioContext || !this.mediaStream) return;
    const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    this.source = inputContext.createMediaStreamSource(this.mediaStream);
    this.processor = inputContext.createScriptProcessor(4096, 1, 1);
    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const pcm16 = floatTo16BitPCM(inputData);
      const base64 = arrayBufferToBase64(pcm16.buffer);
      sessionPromise.then(session => {
        session.sendRealtimeInput({
          media: { mimeType: "audio/pcm;rate=16000", data: base64 }
        });
      });
    };
    this.source.connect(this.processor);
    this.processor.connect(inputContext.destination);
  }

  private async decodeAudio(data: Uint8Array): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error("No Context");
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = this.audioContext.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  }

  private playAudio(buffer: AudioBuffer) {
    if (!this.audioContext) return;
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    const start = Math.max(this.audioContext.currentTime, this.nextStartTime);
    source.start(start);
    this.nextStartTime = start + buffer.duration;
  }

  disconnect() {
    this.isConnected = false;
    this.processor?.disconnect();
    this.source?.disconnect();
    this.mediaStream?.getTracks().forEach(t => t.stop());
    this.audioContext?.close();
  }
}