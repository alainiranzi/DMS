import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/hashPassword";
import { sendCredentialsEmail } from "@/lib/email";


export async function GET() {
  try {
    await connectDB();

    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (!superAdminEmail || !superAdminPassword) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing super admin env variables" }),
        { status: 400 }
      );
    }

    let superAdmin = await User.findOne({ role: "superadmin" });

    if (!superAdmin) {
      const hashed = await hashPassword(superAdminPassword);
      superAdmin = await User.create({
        first_name: "Super",
        last_name: "Admin",
        email: superAdminEmail,
        password: hashed,
        role: "superadmin",
        isApproved: true,
      });

      await sendCredentialsEmail(superAdminEmail, superAdminPassword);
      return new Response(
        JSON.stringify({ success: true, message: "Super admin created & email sent", superAdmin }),
        { status: 201 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Super admin already exists", superAdmin }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}