
import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyB9iR7xFcCOn-8PpJ6zggeYB8O00ASEY0sN"; // Key from .env.local (modified slightly to be safe if logging, but here using internal script)
// Wait, I should use the exact key from the file:
const exactKey = "AIzaSyB9iR7xFcCOn-8PpJ6zggeYB8O00ASEY0sN";

const ai = new GoogleGenAI({ apiKey: exactKey });

async function listModels() {
    try {
        console.log("Listing models...");
        const response = await ai.models.list();
        console.log("Models found:", response.models?.length);
        if (response.models) {
            response.models.slice(0, 20).forEach(m => console.log(m.name, m.displayName));
        }
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

async function testGeneration() {
    try {
        console.log("Testing gemini-2.5-flash...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Hello, are you there?",
        });
        console.log("Response text:", response.text);
    } catch (e) {
        console.error("Error with gemini-2.5-flash:", e.message);
    }

    try {
        console.log("Testing gemini-2.0-flash...");
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Hello, are you there?",
        });
        console.log("Response text:", response.text);
    } catch (e) {
        console.error("Error with gemini-2.0-flash:", e.message);
    }
}

listModels().then(() => testGeneration());
