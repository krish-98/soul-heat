import { Router } from 'express'
import { verifyToken } from '../utils/verify.js'
import { orderDetails, saveOrders } from '../controllers/order.controller.js'

const router = Router()

router.post('/save-orders', verifyToken, saveOrders)
router.get('/order-details', verifyToken, orderDetails)

export default router
