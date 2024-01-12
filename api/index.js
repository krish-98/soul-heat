import express from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path from 'path'

import userRouter from './routes/user.routes.js'
import restaurantRouter from './routes/restaurant.routes.js'
import cartRouter from './routes/cart.routes.js'

dotenv.config()
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const __dirname = path.resolve()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/cart', cartRouter)

// front-end
app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connection established')

    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(err))
