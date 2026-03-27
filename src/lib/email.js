import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender(
  process.env.EMAIL_FROM,
  process.env.EMAIL_FROM_NAME
);


export async function sendCredentialsEmail({
  to,
  first_name,
  password,
  resetLink,
}) {
  const recipients = [new Recipient(to)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Your Account Details")
    .setHtml(`
      <h2>Welcome ${first_name}</h2>
      <p>Your account has been created.</p>
      <p><b>Password:</b> ${password}</p>
      <p>Change your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `);

  await mailerSend.email.send(emailParams);
}


export async function sendResetEmail({ to, resetLink }) {
  const recipients = [new Recipient(to)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Reset Password")
    .setHtml(`
      <h2>Password Reset</h2>
      <p>Click below to reset:</p>
      <a href="${resetLink}">${resetLink}</a>
    `);

  await mailerSend.email.send(emailParams);
}