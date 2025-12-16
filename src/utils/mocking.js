import mongoose from 'mongoose';
import { createHash } from './index.js';

const FIRST_NAMES = [
  'Luca','Mateo','Sofia','Valentina','Martina','Emma','Benjamin','Noah','Mia','Olivia',
  'Thiago','Santino','Lola','Catalina','Dylan','Joaquin','Victoria','Isabella','Ambar','Milo'
];

const LAST_NAMES = [
  'Gonzalez','Rodriguez','Garcia','Fernandez','Lopez','Martinez','Diaz','Perez','Sanchez','Romero',
  'Torres','Flores','Rivera','Gomez','Alvarez','Ruiz','Suarez','Acosta','Vega','Herrera'
];

const SPECIES = ['dog', 'cat', 'rabbit', 'hamster', 'bird'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomBirthDate = () => {
  // entre 0.2 y 15 años atrás
  const years = Math.random() * (15 - 0.2) + 0.2;
  const ms = Math.floor(years * 365.25 * 24 * 60 * 60 * 1000);
  return new Date(Date.now() - ms);
};

/**
 * Genera usuarios mockeados con:
 * - password: "coder123" encriptada
 * - role: "user" o "admin"
 * - pets: []
 * - formato tipo Mongo: incluye _id (ObjectId) y __v
 */
export const generateMockUsers = async (count = 1) => {
  const qty = Number.isFinite(count) && count > 0 ? count : 1;

  // Hash una vez (misma contraseña para todos)
  const hashedPassword = await createHash('coder123');

  const users = [];
  for (let i = 0; i < qty; i++) {
    const first_name = pick(FIRST_NAMES);
    const last_name = pick(LAST_NAMES);

    // email único para evitar conflictos si luego se inserta en BD con índice unique
    const email = `${first_name}.${last_name}.${Date.now()}_${i}@mock.com`.toLowerCase();

    const role = Math.random() < 0.8 ? 'user' : 'admin';

    users.push({
      _id: new mongoose.Types.ObjectId(),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      pets: [],
      __v: 0
    });
  }

  return users;
};

/**
 * Genera mascotas mockeadas (formato tipo Mongo)
 */
export const generateMockPets = (count = 1) => {
  const qty = Number.isFinite(count) && count > 0 ? count : 1;

  const pets = [];
  for (let i = 0; i < qty; i++) {
    const specie = pick(SPECIES);
    const name = `${specie}_${randomInt(1000, 9999)}`;

    pets.push({
      _id: new mongoose.Types.ObjectId(),
      name,
      specie,
      birthDate: randomBirthDate(),
      adopted: false,
      owner: null,
      image: null,
      __v: 0
    });
  }

  return pets;
};
