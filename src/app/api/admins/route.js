import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/hashPassword";
import generatePassword from "@/lib/generatePassword";
import { sendCredentialsEmail } from "@/lib/email";

export async function GET() {
  await connectDB();
  const admins = await User.find({ role: "admin" });
  return Response.json({ admins });
}

export async function POST(req) {
  await connectDB();

  const { name, email } = await req.json();

  const password = generatePassword();
  const hashed = await hashPassword(password);

  const admin = await User.create({
    name,
    email,
    password: hashed,
    role: "admin",
  });

  await sendCredentialsEmail(email, password);

  return Response.json(admin);
}