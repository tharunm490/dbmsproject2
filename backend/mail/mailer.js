require('dotenv').config({ path: './.env' });
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded' : 'Missing');
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
function notifyAdmins(username, userEmail, complaintText, category, location) {
  const adminEmails = ['tharunmbtech24@rvu.edu.in'];
 const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmails.join(','),
    subject: 'New Crime Complaint Submitted',
    text: `A new complaint has been submitted:=

Username: ${username}
Email: ${userEmail}
Category: ${category}
Location: ${location}
View on Map: ${mapsUrl}
Complaint:
${complaintText}

Please help them they need your help.`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendComplaintConfirmation,
  notifyAdmins
};


// module.exports = { sendComplaintConfirmation };
