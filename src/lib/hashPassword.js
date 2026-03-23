// src/lib/hashPassword.js
import { hash, compare } from "bcryptjs";

// Hash password
export async function hashPassword(password) {
  return hash(password, 12); // 12 rounds = safe
}

// Verify password (plain vs hashed)
export async function verifyPassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}