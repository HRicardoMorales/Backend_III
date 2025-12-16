import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Recomendado: configurar MONGO_URL en variables de entorno (por ejemplo, Mongo Atlas)
// Si no está, intentará usar Mongo local.
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/adoptme';

mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err?.message || err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

// ✅ Router de mocks
app.use('/api/mocks', mocksRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
