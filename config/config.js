const mysql = require('mysql2');

// Cargar variables desde .env si estás en local 
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(function(err){
    if(err) {
        console.error('Error en la conexión:', err.stack);
        return;
    }
    console.log('Conexión exitosa con la base de datos');
});

module.exports = db;
