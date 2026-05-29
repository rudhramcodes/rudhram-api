const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");
const { port, corsOrigin, nodeEnv } = require("./src/config/env");
const contactRoutes = require("./src/routes/contactRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// ── Security & parsing ──
app.use(helmet());
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "16kb" }));

// ── Routes ──
app.use("/api", contactRoutes);

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
