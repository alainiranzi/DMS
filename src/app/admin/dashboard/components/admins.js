"use client";

import { useEffect, useState } from "react";
import { MailerSend } from "mailersend";

const mailerSend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });

export const sendCredentialsEmail = async (toEmail, password, resetLink) => {
  await mailerSend.email.send({
    from: { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
    to: [{ email: toEmail }],
    subject: "Your account credentials",
    html: `
      <p>Hello,</p>
      <p>Your account has been created.</p>
      <p>Email: ${toEmail}</p>
      <p>Password: ${password}</p>
      <p>Change your password here: <a href="${resetLink}">Reset Password</a></p>
    `,
  });
};

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchAdmins = async () => {
    const res = await fetch("/api/admins");
    const data = await res.json();
    setAdmins(data.admins || []);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async () => {
    await fetch("/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setOpen(false);
    setName("");
    setEmail("");
    fetchAdmins();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg"
        >
          + Create User
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        {admins.map((a) => (
          <div key={a._id} className="p-3 border-b">
            {a.name} - {a.email}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="mb-4 font-semibold">Create Admin</h3>

            <input
              placeholder="Name"
              className="border p-2 w-full mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              className="border p-2 w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={handleCreate}
                className="bg-sky-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}