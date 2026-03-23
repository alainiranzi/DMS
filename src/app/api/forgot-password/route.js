import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/email";

export async function POST(req) {
  const { email } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, message: "User not found" }),
      { status: 404 }
    );
  }

  
  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

  try {
    await user.save();
    console.log("Token saved in DB:", token);

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    console.log("Reset link:", resetLink);

    await sendResetEmail(email, resetLink);

    return new Response(
      JSON.stringify({ success: true, message: "Reset email sent" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot-password:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send reset email" }),
      { status: 500 }
    );
  }
}