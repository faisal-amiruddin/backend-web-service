const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Submit new project (Public - No authentication required)
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_name
 *               - client_email
 *               - service_type
 *               - description
 *             properties:
 *               client_name:
 *                 type: string
 *                 example: John Doe
 *               client_email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               client_phone:
 *                 type: string
 *                 nullable: true
 *                 example: "+628123456789"
 *               service_type:
 *                 type: string
 *                 example: E-commerce Website
 *               description:
 *                 type: string
 *                 example: Saya ingin membuat website toko online untuk produk fashion
 *               budget:
 *                 type: number
 *                 nullable: true
 *                 example: 5000000
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: 2025-01-31T00:00:00Z
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 nullable: true
 *                 description: Array of base64 encoded images
 *                 example: ["data:image/png;base64,iVBORw0KGgo..."]
 *     responses:
 *       201:
 *         description: Project submitted successfully
 *       400:
 *         description: Validation error
 */
router.post('/', ProjectController.create);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects (Admin only)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, REVIEW, COMPLETED, CANCELLED]
 *         description: Filter by project status
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.get('/', authenticate, authorizeAdmin, ProjectController.getAll);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID (Admin only)
 *     tags: [Projects]
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
 *         description: Project retrieved successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, authorizeAdmin, ProjectController.getById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project status/details (Admin only)
 *     tags: [Projects]
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
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, REVIEW, COMPLETED, CANCELLED]
 *                 example: IN_PROGRESS
 *               notes:
 *                 type: string
 *                 nullable: true
 *                 example: Project sedang dalam tahap development
 *               assigned_to:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: User ID of assigned admin
 *               budget:
 *                 type: number
 *                 nullable: true
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, authorizeAdmin, ProjectController.update);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete project (Admin only)
 *     tags: [Projects]
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
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, authorizeAdmin, ProjectController.delete);

module.exports = router;