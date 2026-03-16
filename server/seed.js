import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MOGODB_URI);
    
    const existing = await User.findOne({ role: "admin" });
    if (existing) {
      console.log("Admin already exists!");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    await User.create({
      name: "Admin",
      email: "admin@careerportal.com",
      password: hashedPassword,
      role: "admin",
      contactNumber: "0000000000"
    });

    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();