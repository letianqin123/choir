// routes/members.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const membersController = require('../controllers/membersController');

// Create a new member
router.post(
  '/',
  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 10 }).withMessage('Name must be at most 10 characters'),
    body('email')
      .optional({ nullable: true }) // Allow null or undefined
      .custom((value) => {
        if (value === null || value === undefined) return true; // Allow null or undefined
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email format
      }).withMessage('Valid email is required')
      .isLength({ max: 100 }).withMessage('Email must be at most 100 characters'),
    body('voice_part')
      .notEmpty().withMessage('Voice part is required')
      .isIn(['Soprano', 'Alto', 'Tenor', 'Bass']).withMessage('Invalid voice part'),
  ],
  membersController.createMember
);

// Get all members
router.get('/', membersController.getAllMembers);

// Get a member by name
router.get('/:name', membersController.getMemberByName);

// Update a member
router.put(
  '/:name',
  [
    body('email')
      .optional({ nullable: true }) // Allow null or undefined
      .custom((value) => {
        if (value === null || value === undefined) return true; // Allow null or undefined
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email format
      }).withMessage('Valid email is required')
      .isLength({ max: 100 }).withMessage('Email must be at most 100 characters'),
    body('voice_part')
      .optional()
      .isIn(['Soprano', 'Alto', 'Tenor', 'Bass']).withMessage('Invalid voice part'),
  ],
  membersController.updateMember
);

// Delete a member
router.delete('/:name', membersController.deleteMember);

// Get members by voice part
router.get('/voice-part/:voice_part', membersController.getMembersByVoicePart);

// Get attendance rate by member name
router.get('/:name/attendance-rate', membersController.getAttendanceRateByName);

module.exports = router;
