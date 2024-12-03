let editor;
let pyodide;

// Código inicial en el editor (asegurándome de que sea una cadena válida)
const defaultCode = `# Ejemplo de tipos de datos incorporados
class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.izquierda = None
        self.derecha = None

def buscar_arbol(raiz, objetivo):
    if not raiz or raiz.valor == objetivo:
        return raiz
    if objetivo < raiz.valor:
        return buscar_arbol(raiz.izquierda, objetivo)
    return buscar_arbol(raiz.derecha, objetivo)


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
