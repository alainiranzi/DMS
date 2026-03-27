import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/email";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1h
    await user.save();

    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    await sendResetEmail({
      to: email,
      resetLink,
    });

    return Response.json({
      success: true,
      message: "Reset email sent",
    });
  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
      message: err.message,
    });
  }
}