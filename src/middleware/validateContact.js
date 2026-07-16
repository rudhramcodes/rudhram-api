const validateContact = (req, res, next) => {
  const { name, email, phone, countryCode, message, botcheck } = req.body;
  // Honeypot — bot fills this, human doesn't
  if (botcheck) {
    return res.status(200).json({ ok: true }); // Silently accept to not tip off bots
  }
  const errors = [];
  if (!name || typeof name !== "string" || name.trim().length < 1) {
    errors.push("Name is required");
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Valid email is required");
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 4) {
    errors.push("Valid phone number is required");
  }
  if (!countryCode || typeof countryCode !== "string" || !countryCode.startsWith("+")) {
    errors.push("Valid country code is required (e.g. +1, +91)");
  }
  if (errors.length > 0) {
    return res.status(422).json({ ok: false, errors });
  }
  // Sanitize
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.phone = phone.trim();
  req.body.countryCode = countryCode.trim();
  if (message) req.body.message = message.trim();
  next();
};

module.exports = validateContact;
