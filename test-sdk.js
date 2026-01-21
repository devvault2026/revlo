
import { GoogleGenAI } from "@google/genai";
console.log("SDK type:", typeof GoogleGenAI);
try {
    const ai = new GoogleGenAI({ apiKey: "test" });
    console.log("AI instance keys:", Object.keys(ai));
    if (ai.models) {
        console.log("ai.models keys:", Object.keys(ai.models));
    }
} catch (e) {
    console.error("Initialization error:", e.message);
}
