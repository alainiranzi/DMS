import User from "@/models/User";
import { hashPassword } from "./hashPassword";

export default async function createSuperAdmin() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (!superAdminEmail || !superAdminPassword) {
    console.error("Missing SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD in .env.local");
    return null;
  }

  
  let existing = await User.findOne({ role: "super_admin" });
  if (existing) {
    console.log("Super admin exists ✅");
    return existing;
  }

  const hashedPassword = await hashPassword(superAdminPassword);

  const superAdmin = await User.create({
    name: "Super Admin",
    email: superAdminEmail,
    password: hashedPassword,
    role: "super_admin",
    isApproved: true
  });

  console.log("Super admin created successfully ✅");
  return superAdmin;
}