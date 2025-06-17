// ==================================================================================
// AUTHENTICATION CONTROLLER
// Handles all authentication-related logic
// Includes signup, login, logout, password reset, email verification, and auth check
// ==================================================================================

import bcrypt from "bcrypt"; // Hashes passwords securely
import crypto from "crypto"; // Generates secure random tokens
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"; // Creates JWT and stores it in cookie
import { User } from "../models/user.model.js"; // Mongoose model for user data in MongoDB
import { 
	sendVerificationEmail, // Sends email with 6-digit verification code
	sendWelcomeEmail, // Sends welcome email after account verification
	sendPasswordResetEmail, // Sends email with password reset link
	sendResetSuccessEmail, // Sends confirmation once password has been changed
} from "../nodemailer/sendEmail.js"; // Contains custom email-sending functions

// ================================================
// SIGN UP CONTROLLER
// Registers new users and sends verification email
// Hashes password and stores user in database
// ================================================
export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		// Ensures all fields are filled in
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		// Checks if email is already registered
		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		// Hashes the user’s password before saving to database
		const hashedPassword = await bcrypt.hash(password, 10);

		// Creates a 6-digit verification code
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		// Sets token to expire after 24 hours
		// Calculates 24 hours in milliseconds (24 hours × 60 minutes × 60 seconds × 1000 milliseconds)
		const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

		// Creates and saves new user document
		const user = new User({
			name,
			password: hashedPassword,
			email,
			verificationToken,
			verificationTokenExpiresAt,
		});
		await user.save();

		// Generates JWT token and sets it in HttpOnly cookie
		generateTokenAndSetCookie(res, user._id, user.isAdmin);

		// Sends the verification email to the user
		await sendVerificationEmail(user.email, verificationToken);

		// Returns newly created user without password field
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		// Returns any signup errors
		res.status(400).json({ success: false, message: error.message });
	}
};

// ================================================
// EMAIL VERIFICATION
// Confirms user email using 6-digit code
// Marks user as verified and sends welcome email
// ================================================
export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		// Finds user with valid verification token
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		// Returns error if token is invalid or expired
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		// Marks user as verified and clears token fields
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		// Sends welcome email upon successful verification
		await sendWelcomeEmail(user.email, user.name);

		// Responds with user data excluding password
		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		// Logs and returns error
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// ================================================
// LOGIN
// Authenticates user using email and password
// Generates and sets JWT cookie upon success
// ================================================
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Finds user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Compares provided password with hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Sets auth cookie with JWT
		generateTokenAndSetCookie(res, user._id, user.isAdmin);

		// Updates last login timestamp
		user.lastLogin = new Date();
		await user.save();

		// Sends successful response with user data
		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
		console.log("User logged in successfully");

	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// ================================================
// LOGOUT
// Clears the JWT token cookie
// ================================================
export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ================================================
// FORGOT PASSWORD
// Sends a password reset email with a secure token
// Token is valid for 1 hour only
// ================================================
export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		// Checks if user exists with provided email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generates secure reset token and expiry time (1 hour)
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour = 3,600,000 ms

		// Saves reset details to user model
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;
		await user.save();

		// Sends reset password link to user
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		// Sends success response
		res.status(200).json({ success: true, message: "Password reset link sent to your email", resetToken });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// ================================================
// RESET PASSWORD
// Resets user’s password using valid reset token
// Hashes new password and saves user
// ================================================
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// Finds user using reset token and checks expiry
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// Hashes and sets the new password
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;

		// Clears the token and expiry fields
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		// Sends confirmation email
		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// ================================================
// CHECK AUTH
// Validates token and returns logged-in user’s data
// Persists session on frontend
// ================================================
export const checkAuth = async (req, res) => {
	try {
		// Looks up user from ID stored in token
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// ================================================
// PASSPORT LOGIN SUCCESS
// Sends success response when logging in via OAuth provider
// ================================================
export const loginSuccess = (req, res) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			message: "Successful",
			user: req.user,
			cookies: req.cookies,
		});
	}
};

// ================================================
// PASSPORT LOGIN FAILURE
// Sends failure response when OAuth login fails
// ================================================
export const loginFailure = (req, res) => {
	res.status(401).json({
		success: false,
		message: "Failure",
	});
};
