import { hash, compare } from "bcryptjs";


export async function hashPassword(password) {
  return hash(password, 12); 
}


export async function verifyPassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}