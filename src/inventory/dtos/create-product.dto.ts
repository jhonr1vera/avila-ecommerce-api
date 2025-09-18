import {z} from "zod/v4";

const CreateProductSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().optional(),
    price: z.number().min(0.01, "Price must be a positive number"),
    quantity: z.number().int().min(0, "Quantity must be a non-negative integer"),
});

export {CreateProductSchema}