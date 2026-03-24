const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./articfoxt.db'); 

db.serialize(() => {
    // 1. Limpiamos la tabla para no duplicar si lo corrés varias veces
    db.run("DROP TABLE IF EXISTS productos");

    // 2. Creamos la tabla de nuevo
    db.run(`CREATE TABLE productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL,
        descripcion TEXT
    )`);

    // 3. Insertamos el menú completo de Michael
    const stmt = db.prepare("INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)");
    
    stmt.run('Pepperoni Suprema', 8.99, 'Doble pepperoni y mucho queso mozzarella');
    stmt.run('Black Aceitunas', 10.75, 'Aceitunas, Maíz, Carne y Pimientos');
    stmt.run('Pepperoni de Mitad', 9.99, 'La favorita de Michael');
    
    stmt.finalize();
    console.log("🍕 ¡Menú completo horneado en la DB!");
});
db.close();