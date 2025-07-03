import { z } from 'zod'

export const addCartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  imageId: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  userRef: z.string(),
})

export const removeCartItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive(),
})

export const cartItemsArraySchema = z.array(addCartItemSchema).min(1)

export const checkoutSchema = z.object({
  cartItems: cartItemsArraySchema,
  // Add other checkout fields as needed
  // customerEmail: z.string().email().optional(),
  // shippingAddress: z.object({...}).optional(),
})

export type AddItem = z.infer<typeof addCartItemSchema>
export type RemoveItem = z.infer<typeof removeCartItemSchema>
export type CartItems = z.infer<typeof cartItemsArraySchema>
export type Checkout = z.infer<typeof checkoutSchema>
