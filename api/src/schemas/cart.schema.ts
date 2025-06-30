import { z } from 'zod'

export const addCartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  imageId: z.string(),
  price: z.number(),
  quantity: z.number(),
  userRef: z.string(),
})

export const removeCartItemSchema = z.object({
  id: z.string(),
  quantity: z.number(),
})

export type AddItem = z.infer<typeof addCartItemSchema>
export type RemoveItem = z.infer<typeof removeCartItemSchema>
