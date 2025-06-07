const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: API for staff information
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: List of staff
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/staff'
 */

router.get("/", staffController.getAll);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get a staff by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The staff ID
 *     responses:
 *       200:
 *         description: Staff found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/staff'
 *       404:
 *         description: Staff not found
 */
router.get("/:id", staffController.getById);

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create a new staff
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/staff'
 *     responses:
 *       201:
 *         description: Staff created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/staff'
 *       400:
 *         description: Invalid input
 */
router.post("/", staffController.createStaff);

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Update a staff by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/staff'
 *     responses:
 *       200:
 *         description: Staff updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/staff'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Staff not found
 */
router.put("/:id", staffController.updateById);

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete a staff member by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The staff ID
 *     responses:
 *       200:
 *         description: Staff member deleted
 *       404:
 *         description: Staff not found
 */
router.delete("/:id", staffController.deleteById);

module.exports = router;
