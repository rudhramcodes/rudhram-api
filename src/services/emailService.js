const nodemailer = require('nodemailer');
const { smtp, teamEmail, fromEmail } = require('../config/env');
const { teamNotificationHtml, autoReplyHtml } = require('../utils/emailTemplates');

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: smtp.port === 465,
  auth: { user: smtp.user, pass: smtp.pass },
});

const sendTeamNotification = async (inquiry) => {
  await transporter.sendMail({
    from: `"Rudhram Contact" <${fromEmail}>`,
    to: teamEmail,
    replyTo: inquiry.email,
    subject: `New enquiry: ${inquiry.name} — ${inquiry.interest}`,
    html: teamNotificationHtml({
      name: inquiry.name,
      email: inquiry.email,
      interest: inquiry.interest,
      message: inquiry.message,
      submittedAt: inquiry.createdAt
        ? new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        : 'Just now',
    }),
  });
};

const sendUserAcknowledgement = async (inquiry) => {
  await transporter.sendMail({
    from: `"Rudhram Enterprises" <${fromEmail}>`,
    to: inquiry.email,
    subject: 'Thank you for contacting Rudhram Enterprises',
    html: autoReplyHtml(inquiry.name),
  });
};

module.exports = { sendTeamNotification, sendUserAcknowledgement };
