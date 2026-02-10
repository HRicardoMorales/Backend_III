import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Id de MongoDB
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         _id: "65a1f2c3d4e5f6a7b8c9d0e1"
 *         first_name: "Sofia"
 *         last_name: "Gonzalez"
 *         email: "sofia.gonzalez@mock.com"
 *         role: "user"
 *         pets: []
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         first_name: "Mateo"
 *         role: "admin"
 */

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: Operaciones sobre usuarios
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/',usersController.getAllUsers);

/**
 * @openapi
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:uid',usersController.getUser);

/**
 * @openapi
 * /api/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:uid',usersController.updateUser);

/**
 * @openapi
 * /api/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete('/:uid',usersController.deleteUser);


export default router;