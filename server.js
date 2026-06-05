const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");
const { port, corsOrigin, nodeEnv } = require("./src/config/env");
const contactRoutes = require("./src/routes/contactRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// ── Trust proxy (Render / production) ──
app.set('trust proxy', 1);

// ── Security & parsing ──
app.use(helmet());
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "16kb" }));

// ── Request timeout (prevent hanging requests) ──
app.use((req, res, next) => {
  req.setTimeout(10000); // 10 seconds
  res.setTimeout(10000);
  next();
});

// ── Routes ──
app.use("/api", contactRoutes);

// ── Keep-alive ping (prevents Render cold starts) ──
app.get("/ping", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// ── Error handler (must be last) ──
app.use(errorHandler);

// ── Start ──
const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port} [${nodeEnv}]`);
  });
};

start();
