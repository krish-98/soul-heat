import { stripe } from '../index.js'
import Cart from '../models/cart.model.js'
import User from '../models/user.model.js'

export const addItem = async (req, res, next) => {
  try {
    const { id, quantity } = req.body

    const existingCartItem = await Cart.findOne({ id })
    if (existingCartItem) {
      existingCartItem.quantity += quantity
      await existingCartItem.save()

      return res.status(200).json(existingCartItem)
    } else {
      const newCartItem = await Cart.create(req.body)

      return res.status(201).json(newCartItem)
    }
  } catch (error) {
    next(error)
  }
}

export const removeItem = async (req, res, next) => {
  try {
    const { id, quantity } = req.body

    const existingCartItem = await Cart.findOne({ id })
    if (!existingCartItem) {
      res.status(404).json({ message: 'Item not found' })
    }

    if (existingCartItem.quantity > 1) {
      existingCartItem.quantity -= quantity
      existingCartItem.save()

      return res.status(200).json(existingCartItem)
    }

    if (existingCartItem.quantity === 1) {
      await existingCartItem.deleteOne()
      res.json({ message: 'Cart deleted' })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getCartItems = async (req, res, next) => {
  try {
    const items = await Cart.find({ userRef: req.user.id })

    res.json(items)
  } catch (error) {
    next(error)
  }
}

export const clearCart = async (req, res, next) => {
  try {
    const deleted = await Cart.deleteMany({ userRef: req.user.id })
    console.log(deleted)
    res.json('Cart items has been deleted!')
  } catch (error) {
    next(error)
  }
}

export const checkout = async (req, res, next) => {
  try {
    const { cartItems } = req.body

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
    })

    console.log(`Session`, session)

    res.json({ id: session.id })
  } catch (error) {
    next(error)
  }
}

const fulfillOrder = (lineItems) => {
  // TODO: fill me in
  console.log('Fulfilling order', lineItems)
}
export const stripeWebhook = async (req, res, next) => {
  const payload = req.body
  const sig = req.headers['stripe-payments']

  let event

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    console.log(event)
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`)
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

    const lineItems = sessionWithLineItems.lineItems

    // Fulfill the purchase...
    fulfillOrder(lineItems)
  }

  res.status(200).end()
}
