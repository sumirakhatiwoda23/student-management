import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const seedUsers = [
  {
    name: "Admin User",
    email: "admin@academia.com",
    password: "Admin@Academia2025!",
    role: "admin",
  },
  {
    name: "Staff User",
    email: "staff@academia.com",
    password: "Staff@Academia2025!",
    role: "staff",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");

    // Clear existing users
    await User.deleteMany({});
    console.log("🗑️  Existing users cleared");

    // Pre-hash passwords and use insertMany to bypass the broken pre-save hook
    const usersWithHashedPasswords = await Promise.all(
      seedUsers.map(async (userData) => ({
        ...userData,
        password: await bcrypt.hash(userData.password, 12),
      }))
    );

    await User.insertMany(usersWithHashedPasswords);
    console.log("👤 Created admin@academia.com (admin)");
    console.log("👤 Created staff@academia.com (staff)");

    console.log("\n🎉 Seed completed successfully!");
    console.log("----------------------------");
    console.log("Admin  → admin@academia.com  / Admin@Academia2025!");
    console.log("Staff  → staff@academia.com  / Staff@Academia2025!");
    console.log("----------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedDB();