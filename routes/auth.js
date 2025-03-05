import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

// Registrasi User
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Semua field harus diisi." });
      }
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Email sudah digunakan." });
  
      const newUser = await User.create({ name, email, password });
      res.status(201).json({ message: "Registrasi berhasil." });
    } catch (error) {
      console.error("Error di Register:", error); // Tambahkan ini untuk debugging
      res.status(500).json({ message: "Terjadi kesalahan.", error: error.message });
    }
  });

// Login User
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email dan password harus diisi." });
      }
  
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "User tidak ditemukan." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Password salah." });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("Error di Login:", error);
      res.status(500).json({ message: "Terjadi kesalahan.", error: error.message });
    }
});

export default router;