import {z} from "zod/v4";

const RegisterUserSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(0, "Password cannot be negative"), // ✅ Mínimo 0
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  roleId: z.number().min(1, "Role ID is required"),
  adminKey: z.string().trim().optional()
}).refine((data) => {
  if (data.roleId === 2 && !data.adminKey) {
    return false;
  }
  return true;
}, {
  message: "Admin key is required for admin role",
  path: ["adminKey"]
});

export {RegisterUserSchema}