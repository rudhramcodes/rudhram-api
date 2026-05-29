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
      console.error("Email send error:", {
        message: err.message,
        code: err.code,
        errno: err.errno,
        syscall: err.syscall,
        command: err.command,
        response: err.response,
        responseCode: err.responseCode,
        stack: err.stack,
      });
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
