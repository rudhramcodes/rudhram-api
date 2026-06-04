const { brevoApiKey, teamEmail, fromEmail } = require('../config/env');
const { teamNotificationHtml, autoReplyHtml } = require('../utils/emailTemplates');

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

async function sendViaBrevo({ fromName, to, replyTo, subject, html }) {
  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': brevoApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: fromName, email: fromEmail },
      to: [{ email: to }],
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      `Brevo API error (${response.status}): ${body.message || JSON.stringify(body)}`
    );
  }
}

const sendTeamNotification = async (inquiry) => {
  await sendViaBrevo({
    fromName: 'Rudhram Contact',
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
  await sendViaBrevo({
    fromName: 'Rudhram Enterprises',
    to: inquiry.email,
    subject: 'Thank you for contacting Rudhram Enterprises',
    html: autoReplyHtml(inquiry.name),
  });
};

module.exports = { sendTeamNotification, sendUserAcknowledgement };
