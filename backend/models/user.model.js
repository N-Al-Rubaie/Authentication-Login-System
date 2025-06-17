// ===========================================================================
// Defines the User schema for MongoDB using Mongoose
// Includes fields for authentication, profile data, and token management
// Adds timestamps for record creation and updates
// ===========================================================================

// Imports Mongoose functions to define data schemas and create models
import { Schema, model } from "mongoose";

// Define the schema for the User collection
const userSchema = new Schema(
	{
		// User's full name (required)
		name: {
			type: String,
			required: true,
		},

		// Email address (must be unique, can be validated elsewhere)
		email: {
			type: String,
			unique: true,
			required: true, 
		},

		// Hashed password string
		password: {
			type: String,
			required: true, 
		},

		// Stores the last login time; defaults to current time
		lastLogin: {
			type: Date,
			default: Date.now,
		},

		// Indicates whether the user's email has been verified
		isVerified: {
			type: Boolean,
			default: false,
		},

		// Flags if the user has admin privileges
		isAdmin: {
			type: Boolean,
			default: false,
		},

		// URL or path to the user's avatar image
		avatar: {
			type: String,
			default: "/noavatar.jpg",
		},

		// Temporary token used for password reset functionality
		resetPasswordToken: String,

		// Expiry timestamp for the reset password token
		resetPasswordExpiresAt: Date,

		// Token sent for email verification
		verificationToken: String,

		// Expiry time for the email verification token
		verificationTokenExpiresAt: Date,
	},
	// Automatically adds createdAt and updatedAt fields
	{ timestamps: true }
);

// Export the User model to be used across the application
export const User = model("User", userSchema);
