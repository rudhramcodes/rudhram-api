const rateLimit = require("express-rate-limit");
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 submissions per IP per 15 min
  message: {
    ok: false,
    error: "Too many submissions. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = contactLimiter;
