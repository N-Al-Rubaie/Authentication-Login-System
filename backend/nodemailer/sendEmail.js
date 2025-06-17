// ===================================================================================
// Sends various types of user-related emails (verification, welcome, password reset)
// Uses Nodemailer transporter and pre-defined HTML templates
// Each function is reusable and handles errors if email sending fails
// ===================================================================================

// Imports all the email HTML templates for various user-related communications
// These templates contain the HTML structure and styling of the emails
import { 
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from './emailTemplates.js';

// Imports the Nodemailer transporter instance which has been configured with the email server settings (SMTP host, port, auth credentials)
// This transporter is responsible for sending emails out from the application
import { transporter } from './nodemailer.config.js';


// (1) Function: sendVerificationEmail
// Sends a verification email to the user’s email address containing a unique verification code
// This is typically used to verify that the user owns the email address they signed up with
// Parameters:
// - email: recipient’s email address (string)
// - verificationToken: a unique alphanumeric code used for verifying the email (string)
// The verificationToken is dynamically injected into the HTML email template before sending
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    // Attempst to send the email using the transporter
    const response = await transporter.sendMail({
      from: process.env.EMAIL, // Sender's address taken securely from environment variables
      to: email,               // Target recipient email address
      subject: "Verify your email", // Subject line displayed in the inbox
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    });

    // Logs successful email sending response for debugging and audit purposes
    console.log("Email sent successfully", response);
  } catch (error) {
    // Logs detailed error information to the console for troubleshooting
    console.error(`Error sending verification`, error);
    // Rethrows the error wrapped in a new Error object to be caught by higher-level handlers
    throw new Error(`Error sending verification email: ${error}`);
  }
};


// (2) Function: sendWelcomeEmail
// Sends a personalised welcome email to a newly registered user, congratulating them on account creation
// This encourages engagement by welcoming them and suggesting next steps
// Parameters:
// - email: recipient’s email address (string)
// - name: recipient’s name used to personalise the email content (string)
// The name is injected dynamically into the email template
export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL, // Sender's email securely stored in environment variables
      to: email,               // Recipient email address
      subject: "Welcome email", // Clear subject indicating email purpose
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name), // Injects the user's name into the HTML template for personalisation
    });

    // Confirmation log on successful email dispatch
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    // Error logging to assist debugging if the sending process fails
    console.error(`Error sending welcome email`, error);
    // Throws error to propagate failure to calling functions for proper handling
    throw new Error(`Error sending welcome email: ${error}`);
  }
};


// (3) Function: sendPasswordResetEmail
// Sends an email to the user containing a secure link to reset their password
// This is triggered when the user initiates a 'forgot password' request
// Parameters:
// - email: recipient’s email address (string)
// - resetURL: a secure URL linking to the password reset page, typically with a time-limited token embedded (string)
// The resetURL is inserted dynamically into the email content
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL, // Email address from environment config
      to: email,               // User's email address
      subject: "Reset your password", // Clear subject indicating email purpose
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), // Personalised clickable link for password reset
    });

    // Logs the successful sending of the reset email for reference
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    // Logs any error that occurred during the sending process
    console.error(`Error sending password reset email`, error);
    // Throws error upwards for the caller to handle the failure gracefully
    throw new Error(`Error sending password reset email: ${error}`);
  }
};


// 4. Function: sendResetSuccessEmail
// Sends a notification email confirming that the user’s password has been successfully reset
// This email acts as a security confirmation to alert the user of account changes
// Parameters:
// - email: recipient’s email address (string)
// No dynamic content is required in this template, as it is a fixed message
export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL, // Sender email from environment variable
      to: email,               // Recipient email
      subject: "Password Reset Successful", // Subject confirming password reset completion
      html: PASSWORD_RESET_SUCCESS_TEMPLATE, // Fixed template without dynamic placeholders
    });

    // Logs successful dispatch of confirmation email
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    // Logs any errors encountered while attempting to send this confirmation email
    console.error(`Error sending password reset success email`, error);
    // Propagates error to allow upper layers to take appropriate action (e.g. retry, alert)
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
