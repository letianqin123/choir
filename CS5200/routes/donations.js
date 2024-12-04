// routes/donations.js

const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const donationsController = require('../controllers/donationsController');

// Create a new donation
router.post(
  '/',
  [
    body('donor_name')
      .notEmpty().withMessage('Donor name is required')
      .isLength({ max: 255 }).withMessage('Donor name must be at most 255 characters'),
    body('donation')
      .notEmpty().withMessage('Donation amount is required')
      .isDecimal().withMessage('Donation must be a decimal number'),
    body('address')
      .optional({ nullable: true }) // Allow null or undefined
      .isLength({ max: 200 }).withMessage('Address must be at most 200 characters'),
    body('email')
      .optional({ nullable: true }) // Allow null or undefined
      .custom((value) => {
        if (value === null || value === undefined) return true; // Allow null or undefined
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email format
      }).withMessage('Valid email is required')
      .isLength({ max: 100 }).withMessage('Email must be at most 100 characters'),
    body('on_donor_list')
      .optional({ nullable: true }) // Allow null or undefined
      .custom((value) => {
        if (value === null || value === undefined) return true; // Allow null or undefined
        if (typeof value === 'boolean') return true; // Allow boolean values
        return false; // Reject invalid types
      }).withMessage('On donor list must be a boolean value'),
    body('acknowledged')
      .optional({ nullable: true }) // Allow null or undefined
      .custom((value) => {
        if (value === null || value === undefined) return true; // Allow null or undefined
        if (typeof value === 'boolean') return true; // Allow boolean values
        return false; // Reject invalid types
      }).withMessage('Acknowledged must be a boolean value'),
    body('notes')
      .optional({ nullable: true }) // Allow null or undefined
      .isLength({ max: 65535 }).withMessage('Notes must be at most 65535 characters'),
  ],
  donationsController.createDonation
);

// Get all donations
router.get('/', donationsController.getAllDonations);

// Get donations by donor name
router.get('/:donor_name', donationsController.getDonationsByDonor);

// Update a donation
router.put(
  '/:donor_name/:donation',
  [
    param('donor_name')
      .notEmpty().withMessage('Donor name is required')
      .isLength({ max: 255 }).withMessage('Donor name must be at most 255 characters'),
    param('donation')
      .notEmpty().withMessage('Donation amount is required')
      .isDecimal().withMessage('Donation must be a decimal number'),
    body('address')
      .optional({ nullable: true })
      .isLength({ max: 200 }).withMessage('Address must be at most 200 characters'),
    body('email')
      .optional({ nullable: true })
      .isEmail().withMessage('Valid email is required')
      .isLength({ max: 100 }).withMessage('Email must be at most 100 characters'),
    body('on_donor_list')
      .optional({ nullable: true })
      .isBoolean().withMessage('On donor list must be a boolean value'),
    body('acknowledged')
      .optional({ nullable: true })
      .isBoolean().withMessage('Acknowledged must be a boolean value'),
    body('notes')
      .optional({ nullable: true })
      .isLength({ max: 65535 }).withMessage('Notes must be at most 65535 characters'),
  ],
  donationsController.updateDonation
);

// Delete a donation
router.delete('/:donor_name/:donation', donationsController.deleteDonation);

module.exports = router;
