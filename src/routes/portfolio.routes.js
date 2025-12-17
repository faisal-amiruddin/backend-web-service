const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/portfolio.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * /portfolios:
 *   get:
 *     summary: Get all portfolios
 *     tags: [Portfolios]
 *     parameters:
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Portfolios retrieved successfully
 */
router.get('/', PortfolioController.getAll);

/**
 * @swagger
 * /portfolios/{id}:
 *   get:
 *     summary: Get portfolio by ID
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Portfolio retrieved successfully
 *       404:
 *         description: Portfolio not found
 */
router.get('/:id', PortfolioController.getById);

/**
 * @swagger
 * /portfolios:
 *   post:
 *     summary: Create new portfolio (Admin only)
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - image
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *                 example: E-commerce Toko Elektronik
 *               description:
 *                 type: string
 *                 example: Website e-commerce lengkap dengan payment gateway dan inventory management
 *               client_name:
 *                 type: string
 *                 nullable: true
 *                 example: PT. Elektronik Indonesia
 *               project_url:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 example: https://example-store.com
 *               image:
 *                 type: string
 *                 description: Base64 encoded image
 *                 example: data:image/png;base64,iVBORw0KGgo...
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["E-commerce", "Payment Gateway", "Inventory"]
 *               order:
 *                 type: integer
 *                 default: 0
 *                 example: 1
 *     responses:
 *       201:
 *         description: Portfolio created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.post('/', authenticate, authorizeAdmin, PortfolioController.create);

/**
 * @swagger
 * /portfolios/{id}:
 *   put:
 *     summary: Update portfolio (Admin only)
 *     tags: [Portfolios]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               client_name:
 *                 type: string
 *                 nullable: true
 *               project_url:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *               image:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               is_active:
 *                 type: boolean
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Portfolio updated successfully
 *       404:
 *         description: Portfolio not found
 */
router.put('/:id', authenticate, authorizeAdmin, PortfolioController.update);

/**
 * @swagger
 * /portfolios/{id}:
 *   delete:
 *     summary: Delete portfolio (Admin only)
 *     tags: [Portfolios]
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
 *         description: Portfolio deleted successfully
 *       404:
 *         description: Portfolio not found
 */
router.delete('/:id', authenticate, authorizeAdmin, PortfolioController.delete);

module.exports = router;