import express, { Router } from 'express'
import { verifyToken } from '../middlewares/verify'
import { orderDetails } from '../controllers/order.controller'
import { stripeWebhook } from '../controllers/order.controller'

const router = Router()

router.get('/order-details', verifyToken, orderDetails)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
)

export default router
