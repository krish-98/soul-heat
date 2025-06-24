import express, { Handler } from 'express'
import {
  getAllRestaurants,
  restaurantInfo,
} from '../controllers/restaurant.controllers'

const router = express.Router()

router.get('/', getAllRestaurants as Handler)
router.get('/:restaurantId', restaurantInfo as Handler)

export default router
