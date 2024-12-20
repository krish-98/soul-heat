import { Router } from 'express'
import {
  allRestaurants,
  restaurantInfo,
} from '../controllers/restaurant.controller'

const router = Router()

router.get('/', allRestaurants)
router.get('/:id', restaurantInfo)

export default router
