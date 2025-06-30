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

export type AddItem = z.infer<typeof addCartItemSchema>
