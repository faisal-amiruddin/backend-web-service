const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/service.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Services retrieved successfully
 */
router.get('/', ServiceController.getAll);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *       404:
 *         description: Service not found
 */
router.get('/:id', ServiceController.getById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create new service (Admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - features
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 nullable: true
 *               order:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       201:
 *         description: Service created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.post('/', authenticate, authorizeAdmin, ServiceController.create);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update service (Admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 */
router.put('/:id', authenticate, authorizeAdmin, ServiceController.update);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete service (Admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */
router.delete('/:id', authenticate, authorizeAdmin, ServiceController.delete);

module.exports = router;