const Inquiry = require("../models/Inquiry");
const {
  sendTeamNotification,
  sendUserAcknowledgement,
} = require("../services/emailService");

const submitContact = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create({
      name: req.body.name,
      email: req.body.email,
      interest: req.body.interest,
      message: req.body.message,
    });

    // Fire both emails in parallel — don't block the response
    Promise.all([
      sendTeamNotification(inquiry).then(() => {
        Inquiry.findByIdAndUpdate(inquiry._id, { teamNotified: true }).exec();
      }),
      sendUserAcknowledgement(inquiry).then(() => {
        Inquiry.findByIdAndUpdate(inquiry._id, {
          userAcknowledged: true,
        }).exec();
      }),
    ]).catch((err) => {
      console.error("Email send error:", err.message);
      // Non-blocking — don't fail the request
    });

    res.status(201).json({
      ok: true,
      message:
        "Your Inquiry has been received. We will respond within 48 hours.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact };
