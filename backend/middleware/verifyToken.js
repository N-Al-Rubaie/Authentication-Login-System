// ===============================================================================
// MIDDLEWARE FUNCTIONS (to verify JWT tokens and user permissions)
// This module contains:
// verifyToken: Verifies presence and validity of the JWT, attaches user info to the request
// verifyTokenAndAuthorization: Ensures the user is either the account owner or an admin
// verifyTokenAndAdmin: Allows access only to admin users
// ===============================================================================

import jwt from "jsonwebtoken"; // Imports the 'jsonwebtoken' library to handle creation and verification of JWT tokens

// VERIFY TOKEN
// Middleware to verify the presence and validity of a JWT in the request cookies
// If the token is valid, user details are extracted and attached to the request object
export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;

	// If no token is found in cookies, return an unauthorised error
	if (!token) {
		return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	}

	try {
		// Attempts to verify the token using the secret key from environment variables
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// If decoding fails or returns null, respond with an unauthorised message
		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
		}

		// Attaches relevant user information to the request object for later middleware
    	req.userId = decoded.userId;
		req.isAdmin = decoded.isAdmin;

		// Proceeds to the next middleware function
		next();
	} 
	catch (error) {
		// If verification throws an error, log it and return a server error response
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};

// VERIFY TOKEN AND AUTHORISATION
// Middleware that first verifies the token, then checks if the user is either
// the owner of the resource or has administrative privileges
export const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		// Authorisation passes if the user matches the ID in the route or is an admin
		if (req.userId === req.params.id || req.isAdmin) {
			next();
		} 
		else {
			// If the user is neither the owner nor an admin, deny access
			res.status(403).json({ success: false, message: "You are not allowed to do that!" });
		}
	});
};

// VERIFY TOKEN AND ADMIN
// Middleware that first verifies the token, then checks if the user has admin rights
// Only administrators will be allowed to proceed beyond this point
export const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		// If the user has admin privileges, allow access
		if (req.isAdmin) {
			next();
		} else {
			// Otherwise, block access and return a forbidden response
			res.status(403).json({ success: false, message: "You are not allowed to do that!" });
		}
	});
};
