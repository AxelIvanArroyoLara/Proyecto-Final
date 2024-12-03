import { initializeGenerativeAI, generateContent } from "./api.js";

// Inicializar la API con la clave
const API_KEY = 'AIzaSyDC9WC91zvdGhOXf-QdZQBOo7CzIJ0FJyY'; // Reemplaza con tu clave API real
const genAI = initializeGenerativeAI(API_KEY);

// Asignar eventos a los botones dentro de las listas
document.querySelectorAll(".tree ul li button").forEach((button) => {
    button.addEventListener("click", async (event) => {
        const topic = event.target.innerText; // Obtiene el texto del botón
        try {
            // Mostrar el cuadro de respuesta
            const responseBox = document.getElementById("responseBox");
            responseBox.style.display = "block";

            // Generar contenido basado en el texto del botón
            const responseText = await generateContent(genAI, `Responde en español: Explique sobre: ${topic}`);

            document.getElementById("responseText").innerText = responseText;
        } catch (error) {
            console.error("Error al generar contenido:", error);
            document.getElementById("responseText").innerText = "Error al generar contenido.";
        }
    });
});
