import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and operations
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: string@string.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "yourpassword123"
 *           example:
 *             name: John Doe
 *             email: string@string.com
 *             password: "yourpassword123"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       401:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 */
userRoutes.post("/user", userController.add);

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Get all users (Admin only)
 *    tags: [User]
 *    security:
 *    - bearerAuth: []
 *    responses:
 *     200:
 *       description: A list of users
 *     401:
 *       description: Unauthorized
 */
userRoutes.get(
  "/user",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  userController.get,
);

/**
 * @swagger
 *  /user/{id}:
 *   get:
 *    summary: Get user by ID
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *    responses:
 *      200:
 *        description: User found
 *      404:
 *        description: User not found

 */
userRoutes.get("/user/:id", userController.find);

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
userRoutes.put("/user", authMiddleware, userController.update);

/**
 * @swagger
 *  /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRoutes.delete("/user/:id", userController.delete);

export { userRoutes };
