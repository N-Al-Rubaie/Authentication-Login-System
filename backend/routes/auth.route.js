// ===============================================================================================================
// Defines authentication routes including signup, login, logout, and password management
// Integrates OAuth login flows for Google, GitHub, and Facebook using Passport.js with success/failure redirects
// Applies validation and token verification middleware to secure and validate user requests
// ===============================================================================================================

import { Router } from 'express';
import passport from "passport";

import {
    signup, 
    login, 
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth,
    loginSuccess,
    loginFailure,
} from '../controllers/auth.controller.js';

import { signupValidations, loginValidations } from '../middleware/userValidations.js';
import { verifyToken } from '../middleware/verifyToken.js';

const authRoutes = Router();

// Route to verify if user token is valid and user is authenticated
authRoutes.get("/check-auth", verifyToken, checkAuth);

// User signup route with validation middleware applied
authRoutes.post("/signup", signupValidations, signup);

// User login route with validation middleware applied
authRoutes.post("/login", loginValidations, login);

// Routes handling login success and failure feedback
authRoutes.get("/login/success", loginSuccess);
authRoutes.get("/login/failure", loginFailure);

// ================== OAuth Authentication Routes ==================

// ======= Google OAuth =======
// Google OAuth login initiation with requested scopes (profile and email)
authRoutes.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback route to handle response after user authentication
authRoutes.get("/google/callback", 
    passport.authenticate(
      "google", 
      {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
      }
    )
);

// ======= GitHub OAuth =======
// GitHub OAuth login initiation requesting profile scope
authRoutes.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// GitHub OAuth callback route with success and failure redirects
authRoutes.get("/github/callback", 
    passport.authenticate(
      "github", 
      {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
      }
    )
);

// ======= Facebook OAuth =======
// Facebook OAuth login initiation requesting profile scope
authRoutes.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// Facebook OAuth callback route with redirects on authentication result
authRoutes.get("/facebook/callback", 
    passport.authenticate(
      "facebook",
      {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
      }
    )
);

// Route to handle user logout, typically invalidates session or token
authRoutes.post("/logout", logout);

// Route to handle email verification by user
authRoutes.post("/verify-email", verifyEmail);

// Route to initiate password reset process (forgot password)
authRoutes.post("/forgot-password", forgotPassword);

// Route to reset password using a token sent to user, token is passed as URL parameter
authRoutes.post("/reset-password/:token", resetPassword);

// Export the router to be used in the main server file
export default authRoutes;
