import { Router } from "express";

import loginController from "../controllers/login.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const loginRoutes = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user session management
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
loginRoutes.post("/login", loginController.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: User logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
loginRoutes.get("/logout", authMiddleware, loginController.logout);

export { loginRoutes };
