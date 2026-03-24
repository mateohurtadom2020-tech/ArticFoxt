const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const db = new sqlite3.Database('./articfoxt.db');

const datos = JSON.parse(fs.readFileSync('pizzas.json', 'utf8'));

db.serialize(() => {
    db.run("DELETE FROM productos"); // Limpiamos para actualizar
    const stmt = db.prepare("INSERT INTO productos (id, nombre, precio, descripcion) VALUES (?, ?, ?, ?)");
    
    datos.forEach(p => {
        stmt.run(p.id, p.nombre, p.precio, p.descripcion);
    });
    
    stmt.finalize();
    console.log("✅ ¡Base de datos sincronizada con el JSON con éxito! 🚀");
});
db.close();