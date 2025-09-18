import {z} from "zod/v4";
import { CreateProductSchema } from "./create-product.dto";

const UpdateProductSchema = CreateProductSchema.partial().extend({
    name: z.string().trim().min(1, "Name is required").optional(),
    description: z.string().trim().optional(),
    price: z.number().min(0.01, "Price must be a positive number").optional(),
    quantity: z.number().int().min(0, "Quantity must be a non-negative integer").optional(),
});

export {UpdateProductSchema}