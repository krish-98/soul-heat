import { Router } from 'express'
import { verifyToken } from '../utils/verify.js'
import {
  getOrderDetails,
  orderDetails,
} from '../controllers/order.controller.js'

const router = Router()

router.post('/order-details', verifyToken, orderDetails)
router.get('/order-details', verifyToken, getOrderDetails)

export default router
