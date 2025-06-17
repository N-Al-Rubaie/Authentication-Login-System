// =============================================================================================
// This module sets up OAuth strategies using Passport.js for Google, GitHub, and Facebook
// It handles user authentication, creates users if not found, and serialises sessions
// Ensures all required environment variables are loaded and strategies are configured correctly
// =============================================================================================

import passport from "passport"; // Imports Passport authentication middleware
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Imports Google OAuth 2.0 strategy
import { Strategy as GithubStrategy } from "passport-github2"; // Imports GitHub OAuth strategy
import { Strategy as FacebookStrategy } from "passport-facebook"; // Imports Facebook OAuth strategy
import { User } from "../models/user.model.js"; // Imports User model for database operations
import dotenv from 'dotenv'; // Loads environment variables from .env file
dotenv.config(); // Initialises dotenv

// Loads sensitive credentials from environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// Ensures Google credentials are present before proceeding
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google Client ID or Secret");
}

// Configures Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `/auth/google/callback`,
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            try {
                // Attempts to find existing user by email
                const user = await User.findOne({ email: profile.emails[0].value });
                if (user) return done(null, user);

                // Creates a new user if not found
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    // avatar: profile.photos[0].value,
                    isVerified: true,
                    password: "",
                });

                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Configures GitHub OAuth strategy
passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            try {
                // Attempts to find existing user by username
                const user = await User.findOne({ username: profile.username });
                if (user) return done(null, user);

                // Creates a new user if not found
                const newUser = new User({
                    name: profile.displayName,
                    username: profile.username,
                    email: profile._json.email,
                    // avatar: profile.photos[0].value,
                    isVerified: true,
                    password: "",
                });

                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Configures Facebook OAuth strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            try {
                // Attempts to find existing user by email
                const user = await User.findOne({ email: profile.emails[0].value });
                if (user) return done(null, user);

                // Creates a new user if not found
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    // avatar: profile.photos[0].value,
                    isVerified: true,
                    password: "",
                });

                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serialises user ID to store in session cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialises user from ID stored in session cookie
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
