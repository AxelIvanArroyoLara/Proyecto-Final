let editor;
let pyodide;

// Código inicial en el editor (asegurándome de que sea una cadena válida)
const defaultCode = `# Ejemplo de tipos de datos incorporados
int_number = 10  # Entero
float_number = 3.14  # Decimal
string_value = "Hola, mundo"  # Cadena
boolean_value = True  # Booleano
print(f"Entero: {int_number}, Flotante: {float_number}, Cadena: {string_value}, Booleano: {boolean_value}")
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
