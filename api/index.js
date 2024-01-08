import express from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import mongoose from 'mongoose'
import path from 'path'

import userRouter from './routes/user.routes.js'
import restaurantRouter from './routes/restaurant.routes.js'
import cartRouter from './routes/cart.routes.js'

dotenv.config()
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// const __dirname = path.resolve()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/cart', cartRouter)

// app.use(express.static(path.join(__dirname, '/client/dist')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// })

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connection established')

    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(err))