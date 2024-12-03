import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializar la API con una clave
export function initializeGenerativeAI(apiKey) {
    return new GoogleGenerativeAI(apiKey);
}

// Generar contenido a partir de un texto
export async function generateContent(genAI, prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Retornar el texto generado
    return response.text();
}
