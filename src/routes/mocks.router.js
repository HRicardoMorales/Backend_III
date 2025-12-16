import { Router } from 'express';
import { usersService, petsService } from '../services/index.js';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';

const router = Router();

router.get('/mockingpets', async (req, res) => {
  try {
    const qty = Number.parseInt(req.query.qty ?? '100', 10);
    const count = Number.isFinite(qty) && qty > 0 ? qty : 100;

    const pets = generateMockPets(count);
    return res.send({ status: 'success', payload: pets });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: error?.message ?? 'Unexpected error' });
  }
});

router.get('/mockingusers', async (req, res) => {
  try {

    const users = await generateMockUsers(50);
    return res.send({ status: 'success', payload: users });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: error?.message ?? 'Unexpected error' });
  }
});

router.post('/generateData', async (req, res) => {
  try {
    const usersQty = Number.parseInt(req.body?.users ?? req.query?.users ?? '0', 10);
    const petsQty = Number.parseInt(req.body?.pets ?? req.query?.pets ?? '0', 10);

    const usersCount = Number.isFinite(usersQty) && usersQty > 0 ? usersQty : 0;
    const petsCount = Number.isFinite(petsQty) && petsQty > 0 ? petsQty : 0;

    const usersDocs = usersCount > 0 ? await generateMockUsers(usersCount) : [];
    const petsDocs = petsCount > 0 ? generateMockPets(petsCount) : [];

    const insertedUsers = usersDocs.length ? await usersService.create(usersDocs) : [];
    const insertedPets = petsDocs.length ? await petsService.create(petsDocs) : [];

    const insertedUsersCount = Array.isArray(insertedUsers) ? insertedUsers.length : (insertedUsers ? 1 : 0);
    const insertedPetsCount = Array.isArray(insertedPets) ? insertedPets.length : (insertedPets ? 1 : 0);

    return res.send({
      status: 'success',
      payload: {
        requested: { users: usersCount, pets: petsCount },
        inserted: { users: insertedUsersCount, pets: insertedPetsCount }
      }
    });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: error?.message ?? 'Unexpected error' });
  }
});

export default router;
