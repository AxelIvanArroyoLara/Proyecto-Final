let editor;
let pyodide;

// Código inicial en el editor (asegurándome de que sea una cadena válida)
const defaultCode = `# Ejemplo de tipos de datos incorporados
class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

nodo1 = Nodo(1)
nodo2 = Nodo(2)
nodo1.siguiente = nodo2
nodo2.siguiente = nodo1  # Lista circular
`;

async function init() {
    editor = CodeMirror(document.getElementById("editor"), {
        mode: "python",
        theme: "monokai",
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        value: defaultCode,
    });

    pyodide = await loadPyodide();
    console.log("Pyodide cargado.");
}

init();

async function runCode() {
    const code = editor.getValue();
    const outputDiv = document.getElementById("output");
    outputDiv.textContent = "";

    try {
        // Redirigir la salida estándar a un buffer
        await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);

        // Ejecutar el código del editor
        await pyodide.runPythonAsync(code);

        // Obtener la salida capturada
        const result = pyodide.runPython("sys.stdout.getvalue()");
        outputDiv.textContent = result || "Sin salida";
    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
    }
}
