const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const puerto = 3000;

// 1. Conexión a la base de datos
const db = new sqlite3.Database('./articfoxt.db', (err) => {
    if (err) {
        console.error("Error al abrir la base de datos:", err.message);
    } else {
        console.log("Conectado a la base de datos de ArticFoxt 🦊");
    }
});

// 2. Ruta para probar que el servidor sirve
app.get('/', (req, res) => {
    res.send('¡Servidor de Michael Pizzeria funcionando!');
});

// 3. Tu API de pizzas (Aquí es donde ocurre la magia)
app.get('/api/pizzas', (req, res) => {
    // Leemos directamente el archivo que SÍ entendés y podés editar
    const fs = require('fs');
    const pizzasJson = JSON.parse(fs.readFileSync('./pizzas.json', 'utf8'));

    res.json({
        message: "Éxito desde el JSON directo",
        pizzas: pizzasJson
    });
});

// 4. Encender el servidor
app.listen(puerto, () => {
    console.log(`¡ÉXITO! Servidor listo en http://localhost:${puerto}`);
});