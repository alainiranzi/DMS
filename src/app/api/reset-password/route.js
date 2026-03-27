import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { token, password } = await req.json();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return Response.json({
      success: true,
      message: "Password updated",
    });
  } catch (err) {
    return Response.json({
      success: false,
      message: err.message,
    });
  }
}