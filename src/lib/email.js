import { MailerSend } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export const sendResetEmail = async (toEmail, token) => {
  try {
    if (!token) throw new Error("Missing reset token");

  
    const baseUrl = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    await mailerSend.email.send({
      from: { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
      to: [{ email: toEmail }],
      subject: "Reset your password",
      html: `<p>Hello,</p>
             <p>Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>`,
    });

    console.log("Reset email sent to", toEmail, "->", resetLink);
  } catch (err) {
    console.error("Error sending reset email:", err.response?.data || err);
    throw new Error("Failed to send reset email");
  }
};