import { sequelize } from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Hapus semua tabel lalu buat ulang
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("Seeding selesai.");
    process.exit();
  } catch (error) {
    console.error("Seeding gagal:", error);
    process.exit(1);
  }
};

seedDatabase();