const { nodeEnv } = require("../config/env");

const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}]`, err.stack || err.message);
  if (err.name === "ValidationError") {
    return res.status(422).json({ ok: false, error: err.message });
  }
  if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(409).json({ ok: false, error: "Duplicate entry" });
  }
  res.status(err.statusCode || 500).json({
    ok: false,
    error: nodeEnv === "production" ? "Internal server error" : err.message,
  });
};

module.exports = errorHandler;
