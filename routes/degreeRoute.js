const express = require('express');
const router = express.Router();
const degreeController = require('../controllers/degreeController');
const degreeValidator = require('../utilities/degree-validator');
const Util = require('../utilities');
const { isAuthenticated } = require('../utilities/authenticate');

/**
 * @swagger
 * tags:
 *   name: Ddegree
 *   description: API for degree information
 */

/**
 * @swagger
 * /degree:
 *   get:
 *     summary: Get all degreees
 *     tags: [Ddegree]
 *     responses:
 *       200:
 *         description: List of degreees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/degree'
 */

router.get('/', Util.handleErrors(degreeController.getAll));
/**
 * @swagger
 * /degree/{id}:
 *   get:
 *     summary: Get a degree by ID
 *     tags: [Ddegree]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The degree ID
 *     responses:
 *       200:
 *         description: Ddegree found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/degree'
 *       404:
 *         description: Ddegree not found
 */
router.get('/:id', Util.handleErrors(degreeController.getById));

/**
 * @swagger
 * /degree:
 *   post:
 *     summary: Create a new degree
 *     tags: [Ddegree]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/degree'
 *     responses:
 *       201:
 *         description: Ddegree created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/degree'
 *       400:
 *         description: Invalid input
 */
router.post(
  '/',
  degreeValidator.degreeValidationRules(),
  isAuthenticated,
  degreeValidator.validateRequest,
  Util.handleErrors(degreeController.createOne),
);

/**
 * @swagger
 * /degree/{id}:
 *   put:
 *     summary: Update a degree by ID
 *     tags: [Ddegree]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The degree ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/degree'
 *     responses:
 *       200:
 *         description: Ddegree updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/degree'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ddegree not found
 */
router.put(
  '/:id',
  degreeValidator.degreeValidationRules(),
  isAuthenticated,
  degreeValidator.validateRequest,
  Util.handleErrors(degreeController.update),
);

/**
 * @swagger
 * /degree/{id}:
 *   delete:
 *     summary: Delete a degree by ID
 *     tags: [Ddegree]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The degree ID
 *     responses:
 *       200:
 *         description: Ddegree deleted
 *       404:
 *         description: Ddegree not found
 */
router.delete('/:id', isAuthenticated, Util.handleErrors(degreeController.delete));

module.exports = router;
