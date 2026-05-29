const { Router } = require("express");
const { submitContact } = require("../controllers/contactController");
const validateContact = require("../middleware/validateContact");
const contactLimiter = require("../middleware/rateLimiter");

const router = Router();

router.post("/contact", contactLimiter, validateContact, submitContact);

// Health check
router.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

module.exports = router;
