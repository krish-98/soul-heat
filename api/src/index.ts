import express from 'express'
import restaurantRouter from './routes/restaurant.routes'

const PORT = process.env.PORT
const app = express()

app.use('/api/v1/restaurant', restaurantRouter)

app.get('/test', (req, res) => {
  res.json({ message: 'API is working properly!' })
})

app.listen(3000, () => console.log(`Server running on port 3000`))
