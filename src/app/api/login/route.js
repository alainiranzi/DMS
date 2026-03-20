import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPassword } from "@/lib/hashPassword";

export async function POST(req) {
  try {
  
    await connectDB();

    
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Email and password required" }),
        { status: 400 }
      );
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ success: false, message: "Incorrect password" }),
        { status: 401 }
      );
    }

    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        user: { name: user.name, email: user.email, role: user.role }
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Server error" }),
      { status: 500 }
    );
  }
}