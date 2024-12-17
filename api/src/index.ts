import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import Stripe from 'stripe'

import userRouter from './routes/user.routes'
import restaurantRouter from './routes/restaurant.routes'
import cartRouter from './routes/cart.routes'
import orderRouter from './routes/order.routes'

dotenv.config()
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const PORT: number = Number(process.env.PORT) || 3000
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use('/api/order/webhook', express.raw({ type: 'application/json' })) // Raw body middleware for Stripe Webhook
app.use(express.json())
app.use(cookieParser())

app.use('/api/restaurant', restaurantRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Database connection established')

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  })
  .catch((err) => console.log(err))
