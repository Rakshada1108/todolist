const express = require('express');
const { body, param } = require('express-validator');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  searchTasks
} = require('../controllers/taskController');

const router = express.Router();

// Validation rules
const taskValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid task ID')
];

// Routes
router.get('/', getAllTasks);
router.get('/search', searchTasks);
router.get('/:id', idValidation, getTaskById);
router.post('/', taskValidation, createTask);
router.put('/:id', idValidation.concat(taskValidation), updateTask);
router.patch('/:id/status', idValidation, [
  body('completed').isBoolean().withMessage('Completed must be a boolean')
], updateTaskStatus);
router.delete('/:id', idValidation, deleteTask);

module.exports = router;
