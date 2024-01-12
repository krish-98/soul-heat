import { Router } from 'express'
import {
  addItem,
  checkout,
  clearCart,
  getCartItems,
  removeItem,
} from '../controllers/cart.controller.js'
import { verifyToken } from '../utils/verify.js'

const router = Router()

router.post('/add-item', verifyToken, addItem)
router.post('/remove-item', verifyToken, removeItem)
router.get('/all-items', verifyToken, getCartItems)
router.post('/checkout', verifyToken, checkout)
router.delete('/clear-cart', verifyToken, clearCart)

export default router
