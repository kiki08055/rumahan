import { z as validate } from "zod";

export const loginSchema = validate.object({
    username: validate.string().min(1, "Username is required"),
    password: validate
    .string()
    .min(8, "Password must be at least 6 characters long"),
});
