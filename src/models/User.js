import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  isApproved: { type: Boolean, default: false },

  // reset password fields
  resetToken: String,
  resetTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;