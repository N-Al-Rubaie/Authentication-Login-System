// ============================================================================================
// GLOBAL ERROR HANDLER
// Handles all uncaught errors in the application and sends a structured response
// Useful for catching and logging unexpected server issues
// ============================================================================================

// Defines a middleware function to handle errors globally across the application
const errorHandler = (err, req, res, next) => {
    // Sets the response status code, defaulting to 500 (Internal Server Error)
    res.status(err.status || 500); 

    // Sends a JSON response containing the error message
    res.json({
        error: {
            message: err.message
        }
    });
};

// Exports the error handler to be used in the main server/app file
export default errorHandler;
