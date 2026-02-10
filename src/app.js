import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoptme API',
      version: '1.0.0',
      description: 'Documentación del módulo Users para la entrega final',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local',
      },
    ],
  },
  apis: ['./src/routes/users.router.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export async function connectDB() {
  const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/adoptme';
  await mongoose.connect(MONGO_URL);
  return mongoose.connection;
}
