// ==================================================================
// VALIDATION MIDDLEWARE (for user signup and login requests)
// Ensures all required fields are present, correctly formatted, and meet length constraints
// Sends back a 422 Unprocessable Entity status with detailed validation errors if any checks fail
// ==================================================================

// Imports validation chain builder and result extractor from express-validator
import { check, validationResult } from 'express-validator';


// VALIDATION FOR SIGNUP
export const signupValidations = [
  // Validates 'name': trims leading/trailing spaces, escapes special characters, ensures not empty
  // Also validates name length is between 3 and 50 characters
  check('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  // Validates 'email': trims, escapes, normalises email, ensures not empty, ensures valid email format
  check('email')
    .trim()
    .escape()
    .normalizeEmail()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  // Validates 'password': trims spaces, ensures not empty, ensures minimum length 8 characters
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  // Middleware to handle validation result:
  // If no errors, passes control to next middleware/handler
  // If errors exist, responds with HTTP 422 and array of error objects
  (req, res, next) => {
    const results = validationResult(req);

    results.isEmpty() ? next() : res.status(422).send(results.errors);
  },
];


// VALIDATION FOR LOGIN
export const loginValidations = [
  // Validates 'email': ensures not empty, ensures valid email format
  check('email')
    .notEmpty()
    .withMessage('Email is a required field')
    .isEmail()
    .withMessage('Invalid email address'),

  // Validates 'password': ensures not empty, ensures minimum length 8 characters
  check('password')
    .notEmpty()
    .withMessage('Password is a required field')
    .isLength({ min: 8 })
    .withMessage('Password is too short'),

  // Middleware to process validation results similar to signup
  (req, res, next) => {
    const results = validationResult(req);

    results.isEmpty() ? next() : res.status(422).send(results.errors);
  },
];
