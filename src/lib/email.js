import { MailerSend } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export const sendResetEmail = async (toEmail, resetLink) => {
  try {
    await mailerSend.email.send({
      from: { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
      to: [{ email: toEmail }],
      subject: "Reset your password",
      html: `<p>Hello,</p>
             <p>Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>`,
    });
    console.log("Reset email sent to", toEmail);
  } catch (err) {
    console.error("Error sending reset email:", err.response?.data || err);
    throw new Error("Failed to send reset email");
  }
};