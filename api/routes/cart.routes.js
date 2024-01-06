import { Router } from 'express'
import {
  addItemsToCart,
  checkout,
  getAllCartItems,
  removeItemFromCart,
} from '../controllers/cart.controller.js'

const router = Router()

router.post('/cart-items', addItemsToCart)
router.get('/all-items', getAllCartItems)
router.post('/remove-cart', removeItemFromCart)
router.post('/checkout-payment', checkout)

export default router
