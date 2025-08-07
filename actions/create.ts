"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

const DEFAULT_USER = {
  name: "Admin",
  email: "denr@gmail.com",
  password: "12345678",
};

export const createDefaultAccount = async () => {
  const hashedPassword = await bcrypt.hash(DEFAULT_USER.password, 10);
  await db.user.create({
    data: {
      name: DEFAULT_USER.name,
      email: DEFAULT_USER.email,
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });
}