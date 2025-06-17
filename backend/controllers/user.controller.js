// ============================================================================================
// USER CONTROLLER FUNCTIONS
// Handles user-related operations including:
// Retrieval, update, deletion, and creating user registration statistics over the past year
// ============================================================================================

// Import the bcrypt library for securely hashing passwords
import bcrypt from "bcrypt";

// Import the User model from the application's user model definition
import { User } from '../models/user.model.js';

// (1) GET USER
// Retrieves a user by their ID from the database
export const getUser = async (req, res) => {
  const { id } = req.params; // Extract the user ID from the request parameters

  try {
    const user = await User.findById(id); // Attempts to find the user by ID

    if (!user) {
      // If no user is found, returns a 404 (Not Found) response
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, returns their details with a 200 (OK) response
    res.status(200).json(user);
  } catch (err) {
    // Logs the error to the console for debugging purposes
    console.error("Error fetching user:", err);
    
    // Returns a 500 (Internal Server Error) response if something goes wrong
    res.status(500).json({ message: "Failed to get user!" });
  }
};

// (2) UPDATE USER
// Handles updating user data, including optional password hashing and avatar update
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    // Returns a 403 (Forbidden) response if user is not authorised
    return res.status(403).json({ message: "Not Authorised!" });
  }

  let updatedPassword = null;
  try {
    // Creates a hashed password if password is provided
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Updates the user with new data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          ...inputs,
          ...(updatedPassword && { password: updatedPassword }), // Includes password only if updated
          ...(avatar && { avatar }), // Includes avatar only if provided
        }
      },
      { new: true }
    );

    // Removes the password field from the response
    const { password: userPassword, ...rest } = updatedUser.toObject();

    // Sets user as verified - consider making this explicit if intended
    updatedUser.isVerified = true;
    await updatedUser.save();

    // Returns the updated user data excluding password
    res.status(200).json(rest);
  } catch (error) {
    // Logs any error and returns a 500 response
    console.error(error);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

// (3) DELETE USER
// Deletes a user by their ID
export const deleteUser = async (req, res) => {
  try {
    // Attempts to delete the user by ID
    await User.findByIdAndDelete(req.params.id);
    
    // Returns confirmation message upon successful deletion
    res.status(200).json("User has been deleted...");
  } catch (error) {
    // Returns a 500 response if an error occurs
    res.status(500).json({ message: error.message });
  }
};

// (4) GET USER BY ID
// Retrieves a user by their ID
export const getUserById = async (req, res) => {
  try {
    // Attempts to find the user by ID
    const user = await User.findById(req.params.id);

    // Returns 404 if user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Returns the found user with a 200 status
    res.status(200).json(user);
  } catch (error) {
    // Returns a 500 response in case of an error
    res.status(500).json({ message: error.message });
  }
};

// (5) GET USER STATS
// Creates monthly user registration statistics for the past year
export const getUserStats = async (req, res) => {
  try {
    // Creates a date object for one year ago
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    // Uses MongoDB aggregation to create monthly registration stats from last year
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear } // Includes users created from last year onwards
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" } // Extracts month from the createdAt field
        }
      },
      {
        $group: {
          _id: "$month", // Groups by month
          total: { $sum: 1 } // Counts users per month
        }
      },
      {
        $sort: { _id: 1 } // Sorts results by month in ascending order
      }
    ]);

    // Returns the aggregated data
    res.status(200).json(data);
  } catch (error) {
    // Returns an error message if something goes wrong
    res.status(500).json({ message: error.message });
  }
};
