import { connectDB } from "@/lib/mongodb";
import createAdmin from "@/lib/createAdmin";

export async function GET() {
  try {
    await connectDB(); 

    const admin = await createAdmin();

    return new Response(
      JSON.stringify({
        success: true,
        message: admin ? "Admin exists or created/updated" : "Admin created",
        admin
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}