function generarCajasDeTexto() {
    const filas = parseInt(document.getElementById("filas").value);
    const columnas = parseInt(document.getElementById("columnas").value);
    const matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = "";

    for (let i = 1; i <= 2; i++) {
        matricesDiv.innerHTML += `<h2>Matriz ${i}</h2>`;
        for (let j = 0; j < filas; j++) {
            for (let k = 0; k < columnas; k++) {
                matricesDiv.innerHTML += `<input type="number" id="matriz${i}_${j}_${k}" placeholder="Fila ${j + 1}, Columna ${k + 1}">`;
            }
            matricesDiv.innerHTML += "<br>";
        }
    }
}

function multiplicarMatrices() {
    const filas = parseInt(document.getElementById("filas").value);
    const columnas = parseInt(document.getElementById("columnas").value);
    const matriz1 = [];
    const matriz2 = [];

    for (let i = 0; i < filas; i++) {
        const fila = [];
        for (let j = 0; j < columnas; j++) {
            const input = document.getElementById(`matriz1_${i}_${j}`);
            if (!input || isNaN(input.value.trim())) {
                alert("Por favor, complete todos los campos de las matrices con valores numéricos.");
                return;
            }
            fila.push(parseInt(input.value));
        }
        matriz1.push(fila);
    }

    for (let i = 0; i < filas; i++) {
        const fila = [];
        for (let j = 0; j < columnas; j++) {
            const input = document.getElementById(`matriz2_${i}_${j}`);
            if (!input || isNaN(input.value.trim())) {
                alert("Por favor, complete todos los campos de las matrices con valores numéricos.");
                return;
            }
            fila.push(parseInt(input.value));
        }
        matriz2.push(fila);
    }

    fetch('/multiplicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = "<h2>Matriz Resultante</h2>";
        data.forEach(row => {
            resultadoDiv.innerHTML += row.join(" ") + "<br>";
        });
    })
    .catch(error => console.error('Error:', error));
}
