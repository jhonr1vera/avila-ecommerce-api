import { z } from "zod/v4";

const SaleItemSchema = z.object({
  productId: z.number().min(1, "Product ID is required"),
  quantity: z.number().int().min(0.01, "Quantity must be at least 1"),
});

const CreateSaleSchema = z.object({
  paymentMethod: z.enum(["Zelle", "Visa", "MasterCard","Paypal"], "Send one of the valid methods: Zelle, Visa, Mastercard, Paypal"),
  items: z.array(SaleItemSchema)
    .min(1, "At least one item is required")
    .refine(items => {
      const productIds = items.map(item => item.productId);
      return productIds.length === new Set(productIds).size;
    }, "Product IDs duplicated"),
});

const UpdateStatusSchema  = z.object({
  status: z.enum(["Pendiente", "En_camino", "Entregado"], "Correct status is required")
})

export {CreateSaleSchema, UpdateStatusSchema}