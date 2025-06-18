import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password length can't be less than 8 characters!"),
})

export const signInSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string(),
})

export const oauthSchema = z.object({
  username: z.string(),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().optional(),
  avatar: z.string(),
})

export type SignUpUser = z.infer<typeof signUpSchema>
export type SignInUser = z.infer<typeof signInSchema>
export type oauthUser = z.infer<typeof oauthSchema>
