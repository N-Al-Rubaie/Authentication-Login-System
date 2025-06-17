// ===================================================================================
// This file defines all user-related API routes using Express Router
// It includes endpoints for updating, deleting, retrieving, and analysing user data
// All routes are protected by authentication middleware to ensure secure access
// ===================================================================================

import { Router } from 'express';

// Imports all the relevant controller functions for user operations
import {
    getAllUsers,       // Retrieves a list of all users in the database
    updateUser,        // Updates user information based on their ID
    deleteUser,        // Deletes a user from the database by ID
    getUser,           // Retrieves a specific user's details by ID
    getUserStats       // Fetches statistical data about users (e.g. number of signups, trends, etc)
} from '../controllers/user.controller.js';

// Imports middleware functions used to verify the identity and role of the user making the request
import {
    verifyToken,                   // Ensures the requester has a valid token (i.e. is logged in)
    verifyTokenAndAuthorization,   // Ensures the requester is the user in question or an admin
    verifyTokenAndAdmin            // Ensures the requester is an admin
} from '../middleware/verifyToken.js';

// Initialising the router object to define user-related routes
const userRoutes = Router();

/**
 * @route   PUT /api/users/update/:id
 * @desc    Allows an authenticated user to update their details (e.g. name, email, etc.)
 * @access  Protected – user must be logged in
 */
userRoutes
    .route('/update/:id')
    .put(verifyToken, updateUser);

/**
 * @route   DELETE /api/users/delete/:id
 * @desc    Deletes a user from the system by their ID
 * @access  Protected – user must be logged in
 */
userRoutes
    .route('/delete/:id')
    .delete(verifyToken, deleteUser);

/**
 * @route   GET /api/users
 * @desc    Retrieves a list of all users in the system
 * @access  Protected – user must be logged in
 */
userRoutes
    .route('/')
    .get(verifyToken, getAllUsers);

/**
 * @route   GET /api/users/find/:id
 * @desc    Retrieves details of a single user based on their ID
 * @access  Protected – user must be logged in
 */
userRoutes
    .route('/find/:id')
    .get(verifyToken, getUser);

/**
 * @route   GET /api/users/stats
 * @desc    Retrieves user-related statistics (e.g. number of new users per month)
 * @access  Protected – user must be logged in
 */
userRoutes
    .route('/stats')
    .get(verifyToken, getUserStats);

// Exports the router so it can be used in the main app file
export default userRoutes;
