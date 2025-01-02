// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Parse JSON from POST requests
app.use(bodyParser.json());

// Serve all static files (HTML, CSS, images, etc.)
// from the SAME directory as server.js
app.use(express.static(__dirname));

/**
 * POST /send-email
 * Expects JSON body: { email, message }
 */
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!email || !message) {
    return res.status(400).send("Missing email or message");
  }

  try {
    // Create a transporter (example: Outlook)
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // use STARTTLS
      auth: {
        user: "your_outlook_email@outlook.com",  // Your Outlook/Office365 email
        pass: "YOUR_APP_PASSWORD"               // Outlook or Office365 app password
      },
      tls: {
        ciphers: "SSLv3"
      }
    });

    // Configure the email
    let mailOptions = {
      from: "your_outlook_email@outlook.com",   // Must match 'auth.user'
      to: "destination@example.com",            // Where you want to receive the email
      subject: "New Inquiry from Website",
      text: `From: ${name}\nEmail: ${email}\n\nInquiry:\n${message}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return res.status(200).send("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).send("Error sending email");
  }
});

// Start the server
const PORT = 3000; // or any port you like
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
