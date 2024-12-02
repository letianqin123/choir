// routes/attendance.js

const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const attendanceController = require('../controllers/attendanceController');

// Create a new attendance record
router.post(
  '/',
  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 10 }).withMessage('Name must be at most 10 characters'),
    body('check_in_date')
      .notEmpty().withMessage('Check-in date is required')
      .isISO8601().withMessage('Check-in date must be a valid date'),
    body('attendance')
      .optional()
      .isBoolean().withMessage('Attendance must be a boolean value'),
    body('absent_reason')
      .optional()
      .isLength({ max: 255 }).withMessage('Absent reason must be at most 255 characters'),
  ],
  attendanceController.createAttendanceRecord
);

// Get all attendance records
router.get('/', attendanceController.getAllAttendanceRecords);

// Get attendance records for a member
router.get('/:name', attendanceController.getAttendanceByMember);

// Update an attendance record
router.put(
  '/:name/:check_in_date',
  [
    param('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 10 }).withMessage('Name must be at most 10 characters'),
    param('check_in_date')
      .notEmpty().withMessage('Check-in date is required')
      .isISO8601().withMessage('Check-in date must be a valid date'),
    body('attendance')
      .optional()
      .isBoolean().withMessage('Attendance must be a boolean value'),
    body('absent_reason')
      .optional()
      .isLength({ max: 255 }).withMessage('Absent reason must be at most 255 characters'),
  ],
  attendanceController.updateAttendanceRecord
);

// Get attendance records for a specific voice part on a given date
router.get(
  '/voice-part/:voice_part/date/:check_in_date',
  [
    param('voice_part')
      .notEmpty().withMessage('Voice part is required')
      .isIn(['Soprano', 'Alto', 'Tenor', 'Bass']).withMessage('Invalid voice part'),
    param('check_in_date')
      .notEmpty().withMessage('Check-in date is required')
      .isISO8601().withMessage('Check-in date must be a valid date'),
  ],
  attendanceController.getAttendanceByVoicePartAndDate
);

// Add attendance records for members of a specific voice part on a given date
router.post(
  '/voice-part/:voice_part/date/:check_in_date',
  [
    param('voice_part')
      .notEmpty().withMessage('Voice part is required')
      .isIn(['Soprano', 'Alto', 'Tenor', 'Bass']).withMessage('Invalid voice part'),
    param('check_in_date')
      .notEmpty().withMessage('Check-in date is required')
      .isISO8601().withMessage('Check-in date must be a valid date'),
    body('attendance_records')
      .isArray().withMessage('Attendance records must be an array')
      .notEmpty().withMessage('Attendance records cannot be empty'),
    body('attendance_records.*.name')
      .notEmpty().withMessage('Name is required for each record')
      .isLength({ max: 10 }).withMessage('Name must be at most 10 characters'),
    body('attendance_records.*.attendance')
      .optional()
      .isBoolean().withMessage('Attendance must be a boolean value'),
    body('attendance_records.*.absent_reason')
      .optional()
      .isLength({ max: 255 }).withMessage('Absent reason must be at most 255 characters'),
  ],
  attendanceController.addAttendanceByVoicePartAndDate
);

module.exports = router;
