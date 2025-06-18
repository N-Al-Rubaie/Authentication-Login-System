# Authentication Login System

## Project Overview

This project provides a complete backend API and frontend interface using the **MERN stack** (MongoDB, Express, React, Node.js). It delivers a robust, secure authentication system with the following advanced features:

- **Email verification** using Nodemailer
- **Password recovery** via token and HttpOnly cookies
- **Social login support** with Passport.js (e.g., Google)
- **Avatar image uploads** integrated with Cloudinary
- **Protected routes** and role-based access control
- **JWT-based authentication** stored in secure cookies
- **Responsive React frontend** powered by Vite


---

## What is included?

- A fully functional RESTful API backend built with Node.js and Express that handles:
  - User authentication and authorisation
  - Profile management
  - Email verification
  - Password reset
  - OAuth social login integration
  - A React frontend consuming this API to provide an interactive user interface

---

## Features

### Backend API Setup

- Database integration using MongoDB and Mongoose
- Authentication endpoints:
  - Signup, login, logout and email verification
  - Forgot password and password reset
  - Profile update and avatar upload using Cloudinary
- Social login support:
  - Google, GitHub and Facebook via Passport.js
- Email services using Nodemailer:
  - Verification and welcome email templates

### Frontend Setup

- Signup page with form validation
- Login page with social login options
- Email verification interface
- Protected routes for authenticated access
- Dashboard showing user details and login timestamps
- Profile page with avatar upload and personal info editing
- Forgot password and reset password workflow

---

## Screenshots

---

### Signup Page

<img width="200" alt="Signup" src="https://github.com/user-attachments/assets/5a82a390-24a2-402d-92c3-e0adafe6efb8" />
<img width="459" alt="Verification Email" src="https://github.com/user-attachments/assets/c3cf5907-0083-468a-8c17-0d5d79742046" />



---

### Dashboard Page
<img width="228" alt="login" src="https://github.com/user-attachments/assets/b8ae9b61-c320-40ac-88ac-e0b6444fecd5" />
<img width="469" alt="Welcome email" src="https://github.com/user-attachments/assets/db8b0868-6cf2-4252-83a1-e80107e75859" />





---

### Update Details
<img width="215" alt="Update" src="https://github.com/user-attachments/assets/0801db38-da57-481c-b6c5-9c10654d1dee" />

<img width="532" alt="cloudinary avatar upload" src="https://github.com/user-attachments/assets/31437e2d-682c-4666-926c-fa50779ff76c" />


---

### Forgot Password





<table>
  <tr>
    <td>
      <img width="415" alt="Forgot password" src="https://github.com/user-attachments/assets/836e2074-b304-428e-bbac-ed29df8c38aa" />
    </td>
    <td>
      <img width="415" alt="Forgot password message" src="https://github.com/user-attachments/assets/db348bd9-145c-45ca-aff4-2ad8f17b6066" />
    </td>
    <td>
      <img width="415" alt="Password reset request" src="https://github.com/user-attachments/assets/d502cf3c-127c-485e-a78a-950352963b5b" />
    </td>
  </tr>
  <tr>
    <td>
      <img width="415" alt="Reset password" src="https://github.com/user-attachments/assets/b89dd8b3-297b-4b51-99e7-3ceda8816197" />
    </td>
    <td>
      <img width="500" alt="Password reset success" src="https://github.com/user-attachments/assets/c30ae557-58b0-4573-96da-77171391f833" />
    </td>
  </tr>
</table>




## Getting Started

### Prerequisites

- Node.js and npm installed
- A MongoDB database (MongoDB Atlas or local)
- Developer accounts for Google, GitHub, and Facebook (for OAuth credentials)
- Cloudinary account for handling avatar uploads

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/advanced-mern-auth.git
cd advanced-mern-auth
```

2. **Install dependencies for backend and frontend**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Create a .env file in the backend/ directory and add the following environment variables**


```env
# Basic Setup
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT & Session
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Client URL
CLIENT_URL=http://localhost:5173

# Email (Nodemailer) - Setup docs at:
# https://nodemailer.com/about/
EMAIL=your_email@example.com
PASS=your_email_app_password

# Google OAuth - Get credentials from:
# https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# GitHub OAuth - Get credentials from:
# https://github.com/settings/developers
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Facebook OAuth - Get credentials from:
# https://developers.facebook.com/apps/
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```
4. **Start the Authentication Login System**



  ```bash
  # Starts the backend
  cd backend
  npm start
  ```



  ```bash
  # Starts the frontend
  cd frontend
  npm run dev
  ```




