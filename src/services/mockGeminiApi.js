/*Simula la api  para las pruebas, asi no consumimos tokens cuando hacemos test */
const CANNED_REPLIES = [
    "RESPUESTA UNO",
    "RESPUESTA DOS",
    "RESPUESTA TRES",
    "RESPUESTA CUATRO"
];

function  pickReply(){
    return CANNED_REPLIES[Math.floor(Math.random()* CANNED_REPLIES.length)];
}

function buildOkResponse(replyText, inputTokens){
    const outputTokens = Math.ceil(replyText.length / 4);

    return {
        candidates: [
            {
                content:{
                    parts: [{text: replyText}],
                    role: "model",
                },
                finishReason: "STOP",
            },
        ],
        usageMetadata: {
            promptTokenCount: inputTokens,
            candidatesTokenCount: outputTokens, 
            totalTokenCount: inputTokens + outputTokens, 
        },
    };
}

function estimateInputTokens(payload) {
    const systemText = payload.systemInstruction?.parts?.[0]?.text ?? "";

    const messagesText = (payload.contents ?? [])
        .flatMap((c) => c.parts ?? [])
        .map((p) => p.text ?? "")
        .join(" ");

        return Math.ceil((systemText.length + messagesText.length) / 4);
}

export function send(payload) {
    return new Promise((resolve) => {
        const delay = 600 + Math.random() * 1000;

        setTimeout(() => {
            const inputTokens = estimateInputTokens(payload);
            const reply = pickReply();
            resolve(buildOkResponse(reply, inputTokens));
        }, delay);
    });
}