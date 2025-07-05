import { Handler, Router } from 'express'
import { orderDetails, orders } from '../controllers/order.controllers'
import { verifyToken } from '../middlewares/verfiyToken'

const router = Router()

router.get('/order-details', verifyToken, orders as Handler)
router.get('/order-details/:orderId', verifyToken, orderDetails as Handler)

export default router
