//create user schema
import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "manager", "user"]),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
