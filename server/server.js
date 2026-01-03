import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/* ---------- Middleware ---------- */
app.use(
  cors({
    origin: "*", // 🔒 Later you can restrict to your Vercel domain
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(express.json());

/* ---------- MongoDB Connection ---------- */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.send("Contact Manager API is running 🚀");
});

app.use("/api/contacts", contactRoutes);

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
