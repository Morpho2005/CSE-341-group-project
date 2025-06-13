const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const studentValidator = require('../utilities/student-validator');
const Util = require('../utilities');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for student information
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/student'
 */
router.get('/', Util.handleErrors(studentController.getAll));

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/student'
 *       404:
 *         description: Student not found
 */
router.get('/:id', Util.handleErrors(studentController.getById));

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/student'
 *     responses:
 *       200:
 *         description: Student updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/student'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 */
router.put(
  '/:id',
  studentValidator.studentValidationRules(),
  studentValidator.validateRequest,
  Util.handleErrors(studentController.update),
);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student deleted
 *       404:
 *         description: Student not found
 */
router.delete('/:id', Util.handleErrors(studentController.delete));

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/student'
 *       400:
 *         description: Invalid input
 */
router.post(
  '/',
  studentValidator.studentValidationRules(),
  studentValidator.validateRequest,
  Util.handleErrors(studentController.createOne),
);

module.exports = router;
