const nodemailer = require('nodemailer');
const dns = require('dns');
const { smtp, teamEmail, fromEmail } = require('../config/env');
const { teamNotificationHtml, autoReplyHtml } = require('../utils/emailTemplates');

// Lazy-init transporter — resolves SMTP hostname to IPv4 only
// Render lacks IPv6 routing to Hostinger, causing ENETUNREACH on v6 addresses
let transporterPromise;

async function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = (async () => {
      let host = smtp.host;
      try {
        const [ipv4] = await dns.promises.resolve4(smtp.host);
        host = ipv4;
      } catch {
        // fallback to hostname if DNS fails
      }
      return nodemailer.createTransport({
        host,
        port: smtp.port,
        secure: smtp.port === 465,
        servername: smtp.host, // TLS SNI — needed when host is a raw IP
        auth: { user: smtp.user, pass: smtp.pass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
      });
    })();
  }
  return transporterPromise;
}

const sendTeamNotification = async (inquiry) => {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: `"Rudhram Contact" <${fromEmail}>`,
    to: teamEmail,
    replyTo: inquiry.email,
    subject: `New Inquiry: ${inquiry.name} — ${inquiry.interest}`,
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
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: `"Rudhram Enterprises" <${fromEmail}>`,
    to: inquiry.email,
    subject: 'Thank you for contacting Rudhram Enterprises',
    html: autoReplyHtml(inquiry.name),
  });
};

module.exports = { sendTeamNotification, sendUserAcknowledgement };
