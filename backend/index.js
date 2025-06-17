// ==================================================================================
// Sets up and configures the Express server with routes, sessions, Passport, and CORS
// Connects to MongoDB and serves static frontend files in production mode
// Includes middleware for JSON parsing, cookies, sessions, and error handling
// ==================================================================================

import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from './db/connectDB.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import path from 'path';
import passport from "passport";
import './config/passport.config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

const PORT = process.env.PORT || 5000;

// Resolve the current directory path for later use (e.g., serving static files)
const __dirname = path.resolve();
console.log(__dirname); // Logs the absolute path of the root directory

// ==================== MIDDLEWARES ====================

// Parses incoming JSON requests and places the data in req.body
app.use(express.json());

// Enables CORS for the specified frontend origin and allows credentials (cookies)
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:5173", 
		credentials: true
	})
);

// Parses cookies from incoming requests and populates req.cookies
app.use(cookieParser());

// Sets up session management using MongoDB as a session store
app.use(
	session({
		secret: process.env.SESSION_SECRET, // Session encryption secret
		resave: false,                      // Don't save unchanged sessions
		saveUninitialized: false,          // Don't save empty sessions
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI, // MongoDB connection URI for sessions
			collectionName: 'sessions',      // Name of the sessions collection
		}),
		cookie: {
			secure: false, // Set to true in production with HTTPS
			maxAge: 24 * 60 * 60 * 1000 // Session duration: 24 hours
		}
	})
);

// Initialises Passport middleware for authentication
app.use(passport.initialize());

// Enables persistent login sessions using Passport
app.use(passport.session());

// ==================== ROUTES ====================

// Routes for authentication actions (e.g., signup, login)
app.use("/auth", authRoutes);

// Routes for user-specific actions (e.g., profile, settings)
app.use("/user", userRoutes);

// ==================== STATIC FILES (PRODUCTION) ====================

// Serves static frontend files in production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/dist')));

	// Handles all other routes by serving the frontend's index.html
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
	});
}

// ==================== ERROR HANDLING ====================

// Custom error-handling middleware for catching and processing errors
app.use(errorHandler);

// ==================== SERVER LISTEN ====================

// Starts the server and connects to the MongoDB database
app.listen(PORT, () => {
	connectDB(); // Establishs connection to the MongoDB database
	console.log(`Server started on http://localhost:${PORT}`);
});
