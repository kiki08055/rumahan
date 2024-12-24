import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Nama produk tidak boleh kosong" }), 
   stock: z.number().min(1, { message: "Stock harus lebih dari 0" }), 
  price: z.number().min(1, { message: "Harga harus lebih dari 0" }), 
  expire_date: z.string().optional(), 
  upcoming_product: z.string().min(1, { message: "Upcoming product cannot be empty" }).optional(),
  code_product: z.string().optional()

});

export const transactionSchema = z.object({
  customerId: z.number().min(1, { message: "Customer ID must be a valid number" }),
  productId: z.number().min(1, { message: "Product ID must be a valid number" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  totalPrice: z.number().min(1, { message: "Total price must be a valid number" }),
  kasirId: z.number().min(1, { message: "Kasir ID must be a valid number" }),
  transactionDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg), 
    z.date() 
  ),
  payment_method: z.string().min(1, { message: "Payment method is required" }),
});