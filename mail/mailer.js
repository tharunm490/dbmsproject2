require('dotenv').config({ path: '../.env' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function sendComplaintConfirmation(toEmail, userName, complaintDetails) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Complaint Submitted Successfully',
    text: `Dear ${userName},

Thank you for submitting your complaint. Here are the details we received:

${complaintDetails}

Our team will investigate the issue and get back to you shortly.

Regards,
Crime Records Management System`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendComplaintConfirmation };
