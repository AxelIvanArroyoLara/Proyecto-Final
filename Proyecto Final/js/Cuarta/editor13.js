let editor;
let pyodide;

// Código inicial en el editor (asegurándome de que sea una cadena válida)
const defaultCode = `# Ejemplo de tipos de datos incorporados
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivote = arr[0]
    menores = [x for x in arr[1:] if x <= pivote]
    mayores = [x for x in arr[1:] if x > pivote]
    return quicksort(menores) + [pivote] + quicksort(mayores)

print(quicksort([4, 2, 6, 1]))

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
