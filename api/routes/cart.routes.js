import { Router } from 'express'
import {
  addItem,
  checkout,
  getCartItems,
  removeItem,
} from '../controllers/cart.controller.js'
import { verifyToken } from '../utils/verify.js'

const router = Router()

router.post('/add-item', verifyToken, addItem)
router.post('/remove-item', verifyToken, removeItem)
router.get('/all-items', verifyToken, getCartItems)
router.post('/checkout-payment', verifyToken, checkout)

export default router
