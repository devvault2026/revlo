/**
 * Robust JSON parsing utility to handle common AI formatting mistakes.
 */
export function safeJsonParse<T>(text: string, fallback: T): T {
    if (!text) return fallback;

    // Remove markdown code blocks if present
    let cleaned = text.replace(/```json\n?|```/g, '').trim();

    try {
        return JSON.parse(cleaned) as T;
    } catch (e) {
        console.warn("First JSON parse attempt failed, trying aggressive cleanup...", e);

        try {
            // Aggressive cleanup:
            // 1. Replace single quotes used for keys or values with double quotes
            //    Note: This is risky but common for AI to mess up.
            //    We only replace ' if it's followed by a colon or follows a colon/comma
            let aggressive = cleaned
                .replace(/'([^']+)':/g, '"$1":') // 'key': -> "key":
                .replace(/: '([^']*)'/g, ': "$1"') // : 'value' -> : "value"
                .replace(/, '([^']*)'/g, ', "$1"') // , 'value' -> , "value"
                .replace(/\['([^']*)'\]/g, '["$1"]') // ['a'] -> ["a"]

                // Handle trailing commas
                .replace(/,(\s*[\]}])/g, '$1');

            return JSON.parse(aggressive) as T;
        } catch (e2) {
            console.error("Aggressive JSON cleanup failed. Raw text:", text);
            return fallback;
        }
    }
}
