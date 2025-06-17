// ==================================================================================
// Generates a JWT token for the authenticated user and sets it as an HttpOnly cookie
// This function is used to maintain secure user sessions in the browser
// Token includes user ID and admin status, and lasts for 7 days
// ==================================================================================

import jwt from "jsonwebtoken";

// Generates JWT token and set cookie on the response object
const generateTokenAndSetCookie = (res, userId, isAdmin) => {
	// Creates a JWT token containing the user ID and admin status
	const token = jwt.sign(
		{
			userId,     // Unique identifier of the user
			isAdmin     // Boolean flag indicating if the user has admin rights
		}, 
		process.env.JWT_SECRET, // Secret key used to sign the token, stored securely in environment variables
		{
			expiresIn: "7d" // Token expiry set to 7 days
		}
	);

	// Sets the token as a cookie in the browser with secure and strict options
	res.cookie("token", token, {
		httpOnly: true,                          // Prevents JavaScript access to the cookie (helps mitigate XSS attacks)
		secure: process.env.NODE_ENV === "production", // Sends cookie only over HTTPS in production
		sameSite: "strict",                      // Restricts cookie to same-site requests (helps mitigate CSRF)
		maxAge: 7 * 24 * 60 * 60 * 1000          // Cookie expiry time in milliseconds (7 days)
	});

	// Returns the token for optional use elsewhere in the application
	return token;
};

export default generateTokenAndSetCookie;
