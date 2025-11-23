import { Resend } from "resend";
import { config } from "dotenv";
config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email, link, type) => {
  var passwordResetEmail = {
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
  var welcomeEmail = {
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
          <p>To get started, you can change your password using the button below.</p>
          <a href="${link}" class="button">Reset Password</a>
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

  if (type === "passwordReset") {
    const { data, error } = await resend.emails.send(passwordResetEmail);
    if (error) {
      return console.error({ error });
    }
    return console.log({ data });
  } else if (type === "welcome") {
    const { data, error } = await resend.emails.send(welcomeEmail);
    if (error) {
      return console.error({ error });
    }
    return console.log({ data });
  } else {
    return console.error({ error: "Invalid email type" });
  }
};

// (async function () {
//   const { data, error } = await resend.emails.send({
//     from: "Acme <onboarding@resend.dev>",
//     to: ["delivered@resend.dev"],
//     subject: "Hello World",
//     html: "<strong>It works!</strong>",
//   });

//   if (error) {
//     return console.error({ error });
//   }

//   console.log({ data });
// })();
