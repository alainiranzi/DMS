import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendCredentialsEmail } from "@/lib/email";


async function getCurrentUser() {
  return { role: "superadmin" };
}


export async function GET() {
  try {
    await connectDB();

    const users = await User.find().sort({ createdAt: -1 });

    return Response.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    return Response.json({
      success: false,
      users: [],
    });
  }
}


export async function POST(req) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();
    const body = await req.json();

    if (currentUser.role !== "superadmin") {
      return Response.json({
        success: false,
        message: "Only superadmin can create admins",
      });
    }

    const rawPassword = crypto.randomBytes(4).toString("hex");
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const resetToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      role: body.role || "admin",
      password: hashedPassword,
      resetToken,
      resetTokenExpiry: Date.now() + 1000 * 60 * 60,
    });

    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    await sendCredentialsEmail({
      to: body.email,
      first_name: body.first_name,
      password: rawPassword,
      resetLink,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    return Response.json({
      success: false,
      message: err.message,
    });
  }
}


export async function DELETE(req) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();
    const { id } = await req.json();

    const user = await User.findById(id);

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "superadmin") {
      return Response.json({
        success: false,
        message: "Cannot delete superadmin",
      });
    }

    if (currentUser.role !== "superadmin") {
      return Response.json({
        success: false,
        message: "Unauthorized",
      });
    }

    await User.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json({
      success: false,
      message: err.message,
    });
  }
}


export async function PUT(req) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();
    const body = await req.json();

    const user = await User.findById(body._id);

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "superadmin" && currentUser.role !== "superadmin") {
      return Response.json({
        success: false,
        message: "Cannot edit superadmin",
      });
    }

    const updated = await User.findByIdAndUpdate(body._id, body, {
      new: true,
    });

    return Response.json({
      success: true,
      user: updated,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return Response.json({
      success: false,
      message: err.message,
    });
  }
}