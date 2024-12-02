import { Router } from 'express'
import { sendTokenResponse, verifyToken } from '../middlewares/verify'
import {
  addItem,
  checkout,
  clearCart,
  getCartItems,
  removeItem,
} from '../controllers/cart.controller'

const router = Router()

router.post('/add-item', verifyToken, sendTokenResponse, addItem)
router.post('/remove-item', verifyToken, sendTokenResponse, removeItem)
router.get('/all-items', verifyToken, sendTokenResponse, getCartItems)
router.post('/checkout', verifyToken, sendTokenResponse, checkout)
router.delete('/clear-cart', verifyToken, sendTokenResponse, clearCart)
// router.post(
//   '/webhook',
//   bodyParser.raw({ type: 'application/json' }),
//   stripeWebhook
// )

export default router
