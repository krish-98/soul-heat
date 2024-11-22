import { Router } from 'express'
import { verifyToken } from '../middlewares/verify.js'
import { orderDetails, saveOrders } from '../controllers/order.controller.js'

const router = Router()

router.post('/save-orders', verifyToken, saveOrders)
router.get('/order-details', verifyToken, orderDetails)

export default router
