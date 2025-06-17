//========================================================================================================
// Sets up the Nodemailer transporter to send emails via SMTP
// Uses SMTP server (Simple Mail Transfer Protocol) with SSL encryption (Secure Sockets Layer) on port 465
// Authenticates using credentials stored in environment variables
//========================================================================================================


// Simple Mail Transfer Protocol - standard protocol used to send emails from one server to another
// Secure Sockets Layer - encrypts data sent between two systems

// Import the nodemailer package for sending emails
import nodemailer from 'nodemailer';

// Create and export a reusable transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  // Mail server hostname, change 'host' based on your email provider e.g. Gmail, Outlook, etc
  // Gmail = smtp.gmail.com 
  // Outlook = smtp.office365.com 
  // You@yourcompany.co.uk  =  you should use your domain’s SMTP server (e.g. from your hosting provider)
  host: "smtp.gmail.com",  

  // SMTP port for secure connections (usually 465 for SSL)
  port: 465,

  // Use TLS/SSL to encrypt the connection
  secure: true,

  // Authentication credentials (retrieved from environment variables)
  auth: {
    user: process.env.EMAIL, // Your full email address
    pass: process.env.PASS   // Your email password or app-specific password
  }
});
