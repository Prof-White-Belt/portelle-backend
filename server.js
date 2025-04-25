import db from "./db/connection.js";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`✅ Received ${req.method} request to ${req.url}`);
  next();
});

// ✅ Mount routes at /api instead of /
app.use("/api", routes);

db.on("connected", () => {
  console.clear();
  console.log("✅ Connected to MongoDB");
  console.log(`🚀 Backend is running at: http://localhost:${PORT}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Express server listening on port ${PORT}`);
});