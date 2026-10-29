import { send as sendToMock } from "./mockGeminiApi.js";
import { RICK_SYSTEM_PROMPT } from "./prompts.js";
import {
    buildPayload,
    normalizeAIResponse,
    getTrimmedHistory
} from "../transform/chatPayload.js";

export async function getCharacterReply(uiMessages) {
    // 1. Recortar historial para controlar tokens.
    const trimmed = getTrimmedHistory(uiMessages);

    // 2. Construir payload con shape de Gemini.
    const payload = buildPayload({
        systemPrompt: RICK_SYSTEM_PROMPT,
        uiMessages: trimmed,
    });

    // 3. Llamar al mock (en L7: fetch a /api/chat).
    const rawResponse = await sendToMock(payload);

    // 4. Normalizar la respuesta a string limpio.
    const text = normalizeAIResponse(rawResponse);

    const usage = rawResponse?.usageMetadata;

if (usage) {
    console.log(`[Tokens] input: ${usage.promptTokenCount}, output: ${usage.candidatesTokenCount}`);
}

return text;
}