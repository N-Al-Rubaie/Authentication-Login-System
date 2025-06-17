// ================================================================
// DATABASE CONNECTION FUNCTION
// Establishes a connection to MongoDB using Mongoose
// Logs connection success or failure and exits process on failure
// ================================================================

// Imports the Mongoose library to interact with MongoDB using an object data model (ODM)
import mongoose from "mongoose";

// Asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Logs the MongoDB URI (for debugging purposes)
    console.log("mongo_uri: ", process.env.MONGO_URI);

    // Attempts to connect to MongoDB using the provided URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, logs the host the database is connected to
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Logs the error message if connection fails
    console.error("Error connecting to MongoDB:", error.message);

    // Exits the process with a failure code
    process.exit(1); // 1 indicates failure; 0 indicates success
  }
};

// Exports the database connection function for use in other files
export default connectDB;
