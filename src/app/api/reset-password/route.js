import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/hashPassword";

export async function POST(req) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return new Response(JSON.stringify({ success: false, message: "Missing token or password" }), { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Invalid or expired token" }), { status: 400 });
  }

  user.password = await hashPassword(password);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return new Response(JSON.stringify({ success: true, message: "Password reset successfully" }), { status: 200 });
}