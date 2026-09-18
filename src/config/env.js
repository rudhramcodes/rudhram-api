require('dotenv').config();

const required = ['MONGODB_URI', 'TEAM_EMAIL', 'FROM_EMAIL', 'SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}

module.exports = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGODB_URI,
  teamEmail: process.env.TEAM_EMAIL,
  fromEmail: process.env.FROM_EMAIL,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'https://rudhramenterprises.com', 'https://www.rudhramenterprises.com'],
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.zoho.in',
    port: parseInt(process.env.SMTP_PORT, 10) || 465,
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
