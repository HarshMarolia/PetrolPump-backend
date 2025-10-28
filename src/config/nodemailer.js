import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true only for 465
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  connectionTimeout: 20000,
  socketTimeout: 30000,
  requireTLS: true,
  keepAlive: true,
  debug: String(process.env.EMAIL_DEBUG || "false") === "true",
  tls: {
    rejectUnauthorized:
      process.env.EMAIL_TLS_REJECT_UNAUTHORIZED === undefined
        ? true
        : String(process.env.EMAIL_TLS_REJECT_UNAUTHORIZED) === "true",
    minVersion: "TLSv1.2",
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Non-blocking startup verification to surface connectivity issues in logs
(async () => {
  try {
    await transporter.verify();
    console.log("SMTP transporter verified and ready (smtp.gmail.com:465, secure=true)");
  } catch (e) {
    console.warn(
      "SMTP transporter verification failed:",
      e && e.message ? e.message : e
    );
  }
})();

export const sendEmail = async (email, link) => {
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Here's your link to updated your password",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #333333;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      color: #666666;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff !important;
      background-color: #007BFF;
      border-radius: 5px;
      text-decoration: none;
    }
    .footer {
      margin-top: 20px;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999999;
    }
  </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>You requested a password reset for your account. Click the button below to create a new password.</p>
          <a href="${link}" class="button">Create New Password</a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; Team FuelInfo. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  // Return a promise and await the send to ensure completion before responding
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, link) => {
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome to Petrol Pump — You're all set!",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome</title>
      <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #333333;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      color: #666666;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff !important;
      background-color: #007BFF;
      border-radius: 5px;
      text-decoration: none;
    }
    .footer {
      margin-top: 20px;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999999;
    }
  </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Petrol Pump</h1>
        </div>
        <div class="content">
          <p>Congratulations on joining our network!</p>
          <p>To get started, you can set your password anytime using the button below.</p>
          <a href="${link}" class="button">Set/Reset Password</a>
          <p>If you didn’t request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; Team FuelInfo. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent: " + info.response);
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
