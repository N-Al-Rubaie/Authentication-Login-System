// (1) VERIFICATION_EMAIL - Sent when a user needs to verify their email
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Confirmation</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #fffefc; color: #2b2b2b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header with brand identity -->
  <div style="background-color: #003366; padding: 20px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0;">Confirm Your Email</h1>
  </div>

  <!-- Email body with verification code -->
  <div style="background-color: #f2f2f2; padding: 20pzx; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <p>Hi there,</p>
    <p>Thank you for creating an account! To continue, please verify your email with the following code:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 36px; font-weight: bold; color: #003366;">{verificationCode}</span>
    </div>
    <p>This code will be valid for 15 minutes.</p>
    <p>If you did not register for an account, kindly ignore this email.</p>
    <p>Warm regards,<br /> N-Al-Rubaie</p>
  </div>

  <!-- Footer notice -->
  <div style="text-align: center; margin-top: 20px; font-size: 0.8em; color: #777;">
    <p>This email was sent automatically. Please do not reply.</p>
  </div>
</body>
</html>
`;

// (2) WELCOME_EMAIL - Sent after successful registration
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4fbff; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Welcome banner -->
  <div style="background-color: #005f73; padding: 20px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0;">Welcome!</h1>
  </div>

  <!-- Welcome message and next steps -->
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <p>Dear {name},</p>
    <p>We’re delighted to welcome you to the <strong>N-Al-Rubaie</strong> family!</p>
    <p>Here’s what you can do now:</p>
    <ul style="margin-left: 20px;">
      <li>Log in and explore your dashboard</li>
      <li>Update your preferences and settings</li>
      
    </ul>
    <p>Thank you for choosing us,<br /> N-Al-Rubaie</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; font-size: 0.8em; color: #555;">
    <p>This email was sent automatically. Please do not reply.</p>
  </div>
</body>
</html>
`;

// (3) PASSWORD_RESET_REQUEST - Sent when user requests a password reset
export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Request</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #fff9f9; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header with purpose -->
  <div style="background-color: #cc0000; padding: 20px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0;">Reset Your Password</h1>
  </div>

  <!-- Instructional message with reset link -->
  <div style="background-color: #fff; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password for your account.</p>
    <p>Click below to proceed:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #cc0000; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link is valid for one hour. If you did not request this, please ignore this email.</p>
    <p>Warm Regards,<br />N-Al-Rubaie</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; font-size: 0.8em; color: #999;">
    <p>This email was sent automatically. Please do not reply.</p>
  </div>
</body>
</html>
`;

// (4) PASSWORD_RESET_SUCCESS - Sent after password was reset
export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Changed</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f9fff9; color: #2a2a2a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Security confirmation header -->
  <div style="background-color: #006400; padding: 20px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0;">Password Updated Successfully </h1>
  </div>

  <!-- Confirmation and security advice -->
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <p>Hello,</p>
    <p>Your password has been changed for your account.</p>
    <p>If this was you, no further action is required.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #006400; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 28px;">
        ✔
      </div>
    </div>
    
    <p>Warm regards,<br />N-Al-Rubaie</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; font-size: 0.8em; color: #888;">
    <p>This email was sent automatically. Please do not reply.</p>
  </div>
</body>
</html>
`;