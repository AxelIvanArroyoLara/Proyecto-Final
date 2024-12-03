let editor;
let pyodide;

// Código inicial en el editor (asegurándome de que sea una cadena válida)
const defaultCode = `# Ejemplo de tipos de datos incorporados
def busqueda_binaria(arr, objetivo):
    bajo, alto = 0, len(arr) - 1
    while bajo <= alto:
        medio = (bajo + alto) // 2
        if arr[medio] == objetivo:
            return medio
        elif arr[medio] < objetivo:
            bajo = medio + 1
        else:
            alto = medio - 1
    return -1

print(busqueda_binaria([1, 2, 3, 4, 5], 4))


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
