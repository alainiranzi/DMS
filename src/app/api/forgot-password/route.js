import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/email";

export async function POST(req) {
  const { email } = await req.json();
  await connectDB();

  // Reba user
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, message: "User not found" }),
      { status: 404 }
    );
  }

  // Generate token (1 hour expiry)
  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  try {
    // Twohereze token nyayo muri sendResetEmail
    await sendResetEmail(email, token);

    return new Response(
      JSON.stringify({ success: true, message: "Reset email sent" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send reset email" }),
      { status: 500 }
    );
  }
}