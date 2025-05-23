import { z } from "zod";

export interface UserDetails {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  gender: string;
}

export interface User extends UserDetails {
  userId: number;
  photoUrl?: string;
  role: string;
}

export const schema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email(),
    gender: z.string().min(1, "Gender is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must match the password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password & Confirm Password do not match!",
    path: ["confirmPassword"],
  });
