import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Reemplaza 'YOUR_API_KEY' con tu clave de API real
const API_KEY = 'AIzaSyDC9WC91zvdGhOXf-QdZQBOo7CzIJ0FJyY';
const genAI = new GoogleGenerativeAI(API_KEY);

document.getElementById('generateButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = inputText;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        document.getElementById('responseText').innerText = response.text();
    } catch (error) {
        console.error('Error al generar contenido:', error);
    }
});
