import { Handler, Router } from 'express'
import { verifyToken } from '../middlewares/verfiyToken'
import {
  addItem,
  checkout,
  clearCart,
  getCartItems,
  removeItem,
} from '../controllers/cart.controllers'

const router = Router()

router.post('/items', verifyToken, addItem as Handler)
router.delete('/items/:id', verifyToken, removeItem as Handler)
router.get('/items', verifyToken, getCartItems)
router.delete('/', verifyToken, clearCart)
router.post('/checkout', verifyToken, checkout)

export default router
