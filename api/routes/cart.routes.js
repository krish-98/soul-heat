import express, { Router } from 'express'
import bodyParser from 'body-parser'
import {
  addItem,
  checkout,
  clearCart,
  getCartItems,
  removeItem,
  stripeWebhook,
} from '../controllers/cart.controller.js'
import { verifyToken } from '../middlewares/verify.js'

const router = Router()

router.post('/add-item', verifyToken, addItem)
router.post('/remove-item', verifyToken, removeItem)
router.get('/all-items', verifyToken, getCartItems)
router.post('/checkout', verifyToken, checkout)
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  stripeWebhook
)
router.delete('/clear-cart', verifyToken, clearCart)

export default router
