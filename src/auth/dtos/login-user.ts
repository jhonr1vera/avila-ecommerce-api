import {z} from "zod/v4";

const LoginUserSchema = z.object({
    username: z.string().trim().min(1, "Name is required"),
    password: z.string().trim().min(1, "Password is required"),
});

export {LoginUserSchema}