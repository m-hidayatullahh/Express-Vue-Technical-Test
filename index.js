import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import connectDB, { sequelize } from "./config/db.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();
connectDB();

sequelize.sync({ alter: true }).then(() => {
    console.log("Database & tables created!");
});

const app = express();

app.use("/api/dashboard", dashboardRoutes);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});