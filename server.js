const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

function multiplicarMatrices(matriz1, matriz2) {
    const resultado = [];
    const filas = matriz1.length;
    const columnas = matriz2[0].length;
    const intermedia = matriz2.length;

    for (let i = 0; i < filas; i++) {
        resultado[i] = [];
        for (let j = 0; j < columnas; j++) {
            let sum = 0;
            for (let k = 0; k < intermedia; k++) {
                sum += matriz1[i][k] * matriz2[k][j];
            }
            resultado[i][j] = sum;
        }
    }
    return resultado;
}

app.post('/multiplicar', (req, res) => {
    const { matriz1, matriz2 } = req.body;
    const resultado = multiplicarMatrices(matriz1, matriz2);
    res.json(resultado);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
