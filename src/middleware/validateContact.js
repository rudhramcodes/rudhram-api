const validateContact = (req, res, next) => {
  const { name, email, interest, message, botcheck } = req.body;
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
  const validInterests = [
    "Partnership",
    "Venture inquiry",
    "Collaboration",
    "Social impact",
  ];
  if (!interest || !validInterests.includes(interest)) {
    errors.push("Valid interest is required");
  }
  if (errors.length > 0) {
    return res.status(422).json({ ok: false, errors });
  }
  // Sanitize
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  if (message) req.body.message = message.trim();
  next();
};

module.exports = validateContact;
