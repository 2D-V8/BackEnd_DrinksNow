require('dotenv').config(); // Cargar variables del .env
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');

// Importar rutas
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

// Middlewares
app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.disable('x-powered-by');

const upload = multer({ storage: multer.memoryStorage() });

// Rutas
userRoutes(app);

// Iniciar servidor
server.listen(port, () => {
  console.log(`Servidor Node.js escuchando en puerto ${port}`);
});

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Ruta Raiz BackEnd');
});
app.get('/test', (req, res) => {
  res.send('Ruta test');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.stack);
});
