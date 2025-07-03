import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.routes'
import restaurantRouter from './routes/restaurant.routes'
import cartRouter from './routes/cart.routes'
import { CustomError } from './utils/errorHandler'
import { connectToDB } from './utils/db'
import Stripe from 'stripe'

dotenv.config()

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const PORT = process.env.PORT || 3000
const app = express()

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/restaurant', restaurantRouter)
app.use('/api/v1/cart', cartRouter)

// Global error handling middleware
// @ts-ignore
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

app.listen(3000, async () => {
  try {
    await connectToDB()
    console.log(
      `Server is running on ${PORT} and database connection established`
    )
  } catch (error) {
    console.error(error)
  }
})
