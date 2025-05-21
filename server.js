require('dotenv').config(); // Cargar variables del .env
import express, { json, urlencoded } from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
import logger from 'morgan';
import cors from 'cors';
import passport, { initialize, session } from 'passport';
import multer, { memoryStorage } from 'multer';

// Importar rutas
import userRoutes from './routes/userRoutes';

const port = process.env.PORT || 3000;

// Middlewares
app.use(logger('dev'));
app.use(json()); 
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(initialize());
app.use(session());
require('./config/passport')(passport);
app.disable('x-powered-by');

const upload = multer({ storage: memoryStorage() });

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
