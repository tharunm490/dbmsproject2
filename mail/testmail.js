require('dotenv').config({ path: '../.env' });

const nodemailer = require('nodemailer');

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // NOT your regular Gmail password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'tharunmadhava570@gmail.com', // or another test email
      subject: 'Test Email from Node.js',
      text: 'hello how are you',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

sendTestEmail();
