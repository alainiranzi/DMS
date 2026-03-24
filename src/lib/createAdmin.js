import User from "@/models/User";
import { hashPassword } from "./hashPassword";

export default async function createAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local");
    return null;
  }

  
  const existingAdmin = await User.findOne({ role: "admin" });

  if (existingAdmin) {
    
    existingAdmin.email = adminEmail;
    existingAdmin.password = await hashPassword(adminPassword);
    await existingAdmin.save();
    console.log("Admin updated successfully ✅");
    return existingAdmin;
  }


  const hashedPassword = await hashPassword(adminPassword);

  const newAdmin = await User.create({
    name: "Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
    isApproved: true
  });

  console.log("Admin created successfully ✅");
  return newAdmin;
}