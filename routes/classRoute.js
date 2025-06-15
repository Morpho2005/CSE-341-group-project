const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const classValidator = require('../utilities/class-validator');
const Util = require('../utilities');
const { isAuthenticated } = require('../utilities/authenticate');

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: API for class information
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     tags: [Class]
 *     responses:
 *       200:
 *         description: List of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/class'
 */

router.get('/', Util.handleErrors(classController.getAll));
/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     responses:
 *       200:
 *         description: Class found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/class'
 *       404:
 *         description: Class not found
 */
router.get('/:id', Util.handleErrors(classController.getById));

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/class'
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/class'
 *       400:
 *         description: Invalid input
 */
router.post(
  '/',
  isAuthenticated,
  classValidator.classValidationRules(),
  classValidator.validateRequest,
  Util.handleErrors(classController.createOne),
);

/**
 * @swagger
 * /class/{id}:
 *   put:
 *     summary: Update a class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/class'
 *     responses:
 *       200:
 *         description: Class updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/class'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Class not found
 */
router.put(
  '/:id',
  isAuthenticated,
  classValidator.classValidationRules(),
  classValidator.validateRequest,
  Util.handleErrors(classController.update),
);

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     responses:
 *       200:
 *         description: Class deleted
 *       404:
 *         description: Class not found
 */
router.delete('/:id', isAuthenticated, Util.handleErrors(classController.delete));

module.exports = router;
