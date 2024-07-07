import { stripe } from '../index.js'
import Cart from '../models/cart.model.js'
import Order from '../models/order.model.js'
import User from '../models/user.model.js'
import { handleError } from '../utils/error.js'

export const addItem = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      next(handleError(400, 'Request body cannot be empty'))
    }

    const { id, quantity } = req.body

    const cartItem = await Cart.findOne({ id })
    if (!cartItem) {
      const newCartItem = await Cart.create(req.body)

      return res.status(201).json(newCartItem)
    } else {
      cartItem.quantity += quantity
      await cartItem.save()

      return res.status(200).json(cartItem)
    }
  } catch (error) {
    next(error)
  }
}

export const removeItem = async (req, res, next) => {
  try {
    const { id, quantity } = req.body

    const cartItem = await Cart.findOne({ id })
    if (!cartItem) {
      res.status(404).json({ message: 'Item not found' })
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= quantity
      await cartItem.save()

      return res.status(200).json(cartItem)
    }

    if (cartItem.quantity === 1) {
      await cartItem.deleteOne()
      res.json({ message: 'Cart deleted' })
    }
  } catch (error) {
    next(error)
  }
}

export const getCartItems = async (req, res, next) => {
  try {
    const items = await Cart.find({ userRef: req.user.id })

    res.json({ items })
  } catch (error) {
    next(error)
  }
}

export const clearCart = async (req, res, next) => {
  try {
    const deleted = await Cart.deleteMany({ userRef: req.user.id })

    res.status(200).json({ message: 'Cart items has been deleted!' })
  } catch (error) {
    next(error)
  }
}

export const checkout = async (req, res, next) => {
  try {
    const cartItems = req.body

    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'Invalid cart items' })
    }

    const user = await User.findOne({ _id: req.user.id })

    const lineItems = cartItems.map((cartItem) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: cartItem.name,
            images: [
              `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cartItem.imageId}`,
            ],
          },
          unit_amount: Math.round(cartItem.price),
        },
        quantity: cartItem.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: user.email,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      submit_type: 'pay',
      billing_address_collection: 'auto',
      metadata: {
        userId: req.user.id,
      },
    })

    await Order.create({
      orders: req.body,
      userRef: req.user.id,
      status: 'Processing',
    })

    res.json({ id: session.id })
  } catch (error) {
    next(error)
  }
}

export const stripeWebhook = async (req, res, next) => {
  const payload = req.body
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    console.log(`Event: ${event}`)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    )
    const lineItems = sessionWithLineItems.line_items

    // Fulfill the purchase...
    // fulfillOrder(lineItems)
    console.log(`LineItems: ${lineItems}`)
  }

  response.status(200).end()
}
