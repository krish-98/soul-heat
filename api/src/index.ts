import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import restaurantRouter from './routes/restaurant.routes'
import authRouter from './routes/auth.routes'
import { CustomError } from './utils/error'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/restaurant', restaurantRouter)

// Global error default handling middleware
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
    await mongoose.connect(process.env.MONGODB_URI as string)

    console.log(
      `Server is running on ${PORT} and database connection established`
    )
  } catch (error) {
    console.error(error)
  }
})
