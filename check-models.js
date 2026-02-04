
import { GoogleGenerativeAI } from "@google/generative-ai";

const exactKey = "AIzaSyB9iR7xFcCOn-8PpJ6zggeYB8O00ASEY0sN";
const genAI = new GoogleGenerativeAI(exactKey);

async function listModels() {
    try {
        console.log("Listing models...");
        // The listModels method is on the genAI instance in some versions, or requires a different approach.
        // Actually, the current SDK doesn't always support listModels easily without specific auth.
        // Let's just try generating with known model names.
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

async function testGeneration(modelName) {
    try {
        console.log(`Testing ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say 'Hello World'");
        const text = result.response.text();
        console.log(`[${modelName}] Success: ${text}`);
        return true;
    } catch (e) {
        console.error(`[${modelName}] Failed:`, e.message);
        return false;
    }
}

async function runTests() {
    const modelsToTest = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-2.0-flash-exp",
        "gemini-2.0-flash",
        "gemini-2.0-pro-exp-02-05"
    ];

    for (const m of modelsToTest) {
        await testGeneration(m);
    }
}

runTests();
