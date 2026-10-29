import { describe, it, expect } from "vitest";

import {
  buildPayload,
  normalizeAIResponse,
  getTrimmedHistory,
} from "../src/transform/chatPayload.js";

import { send as mockGeminiSend } from "../src/services/mockGeminiApi.js";

describe("normalizeAIResponse", () => {
  it("deberia extraer el texto de una respuesta valida de Gemini", async () => {
    // ARRANGE
    const fakePayload = {
      systemInstruction: { parts: [{ text: "sos Rick" }] },
      contents: [{ role: "user", parts: [{ text: "hola" }] }],
    };

    const geminiResponse = await mockGeminiSend(fakePayload);

    //ACT
   const text = normalizeAIResponse(geminiResponse);

   //ASERT
   expect(typeof text).toBe("string");
   expect(text.length).toBeGreaterThan(0);

  });

  it("deberia devolver string vacio cuando la respuesta es invalida", () => {
  // Caso A: respuesta es null
  expect(normalizeAIResponse(null)).toBe("");

  // Caso B: candidates no existe
  expect(normalizeAIResponse({})).toBe("");

  // Caso C: candidates es array vacio
  expect(normalizeAIResponse({ candidates: [] })).toBe("");

  //Caso D: parts es array vacio
expect(
  normalizeAIResponse({
    candidates: [{ content: { parts: [] } }],
  }),
).toBe("");

// Caso E: parts tiene objetos sin texto valido
expect(
  normalizeAIResponse({
    candidates: [
      {
        content: {
          parts: [{ notText: "x" }, null, { text: 123 }],
        },
      },
    ],
  }),
).toBe("");


});
  
});




describe("buildPayload", () => {
  it("deberia construir el shape correcto para Gemini", () => {
    // ARRANGE
    const systemPrompt = "Eres Vegueta el principe sayayin";
    const uiMessages = [
      { role: "user", text: "hola" },
      { role: "character", text: "Te atreves a nombrarme, insecto" },
    ];

    //ACT 
    const payload = buildPayload({systemPrompt, uiMessages});

    //ASSERT
    expect(payload).toEqual({
  systemInstruction: { parts: [{ text:"Eres Vegueta el principe sayayin"}] },
  contents: [
    { role: "user", parts: [{ text: "hola" }] },
    { role: "model", parts: [{ text: "Te atreves a nombrarme, insecto" }] },
  ],
  generationConfig: {
    maxOutputTokens: 200,
    temperature: 0.9,
  },
});

  });
});


describe("getTrimmedHistory", () => {
  it("deberia devolver los ultimos N mensajes cuando hay mas que el limite", () => {
    // ARRANGE: array de 15 mensajes simulados
    const messages = Array.from({ length: 15 }, (_, i) => ({
      role: "user",
      text: `mensaje ${i + 1}`,
    }));

    // ACT
    const trimmed = getTrimmedHistory(messages, 12);

    // ASSERT: solo los ultimos 12 (del 4 al 15)
    expect(trimmed).toHaveLength(12);
    expect(trimmed[0].text).toBe("mensaje 4");
    expect(trimmed[11].text).toBe("mensaje 15");
  });

  it("deberia devolver el historial completo si tiene menos que el limite", () => {
  const messages = [
    { role: "user", text: "a" },
    { role: "character", text: "b" },
    { role: "user", text: "c" },
  ];

  const trimmed = getTrimmedHistory(messages, 12);

  expect(trimmed).toHaveLength(3);
  expect(trimmed).toEqual(messages);
});



});

