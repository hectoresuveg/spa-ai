//import { send as sendToMock } from "./mockGeminiApi.js"; Este import sirve para la simulacion 
import { VEGUETA_SYSTEM_PROMPT } from "./prompts.js";
import {
    buildPayload,
    normalizeAIResponse,
    getTrimmedHistory
} from "../transform/chatPayload.js";

import { fetchJson } from "./fetchJson.js";

const CHAT_ENDPOINT = "/api/chat";

export async function getCharacterReply(uiMessages) {
    // 1. Recortar historial para controlar tokens.
    const trimmed = getTrimmedHistory(uiMessages);

    // 2. Construir payload con shape de Gemini.
    const payload = buildPayload({
        systemPrompt: VEGUETA_SYSTEM_PROMPT,
        uiMessages: trimmed,
    });

    // 3. Llamar a la serverless function
    let rawResponse;

    try {
    rawResponse = await fetchJson(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
} catch (err) {

    if (err.status === 429 && err.body?.retryAfterSeconds) {
    err.retryAfterSeconds = err.body.retryAfterSeconds;
}

throw err;

}

    // 4. Normalizar la respuesta a string limpio.
    const text = normalizeAIResponse(rawResponse);

    const usage = rawResponse?.usageMetadata;

if (usage) {
    console.log(`[Tokens] input: ${usage.promptTokenCount}, output: ${usage.candidatesTokenCount}`);
}

return text;
}