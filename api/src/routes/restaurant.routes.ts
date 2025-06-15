import express from 'express'
import {
  getAllRestaurants,
  restaurantInfo,
} from '../controllers/restaurant.controllers'

const router = express.Router()

router.get('/', getAllRestaurants)
router.get('/:restaurantId', restaurantInfo)

export default router
