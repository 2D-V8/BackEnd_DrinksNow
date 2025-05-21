const mysql = require('mysql2');

// Cargar variables desde .env si estás en local
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,         // 'localhost' o el host de Railway
    user: process.env.DB_USER,         // 'root' o el user de Railway
    password: process.env.DB_PASSWORD, // tu password local o el de Railway
    database: process.env.DB_NAME      // nombre de la base de datos
});

db.connect(function(err){
    if(err) {
        console.error('Error en la conexión:', err.stack);
        return;
    }
    console.log('Conexión exitosa con la base de datos');
});

module.exports = db;
