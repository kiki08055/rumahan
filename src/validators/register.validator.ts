import { z as validate } from "zod";

export const registerSchema = validate.object({
    username: validate.string().min(1, "Username is required"),
    email: validate.string().email("Invalid email address"),
    password: validate
    .string()
    .min(6, "Password must be at least 6 characters long"),
});
