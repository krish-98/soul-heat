import { stripe } from '../index.js'
import Cart from '../models/cart.model.js'

export const addItem = async (req, res, next) => {
  try {
    const { id, quantity } = req.body

    let existingCartItem = await Cart.findOne({ id })

    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1
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

export const removeItem = async (req, res) => {
  try {
    const { id, quantity } = req.body
    let existingCartItem = await Cart.findOne({ id })

    if (existingCartItem && existingCartItem.quantity > 0) {
      existingCartItem.quantity -= quantity || 1
      existingCartItem.save()

      if (existingCartItem.quantity === 0) {
        await existingCartItem.deleteOne()
        res.json({ message: 'Cart deleted' })
      }
      return res.status(200).json(existingCartItem)
    }
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message })
  }
}

export const getCartItems = async (req, res) => {
  const items = await Cart.find({})

  res.json(items)
}

export const checkout = async (req, res) => {
  const { cartItems } = req.body

  try {
    const lineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [`${process.env.CLOUDINARY_URL}${item.imageId}`],
          },
          unit_amount: Math.round(
            item.price || item.defaultPrice + item.quantity
          ),
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      submit_type: 'pay',
      billing_address_collection: 'auto',
      // shipping_options: [{ shipping_rate: 'shr_1NeFaFSBzzrld9LFwwmTon9O' }],
    })

    res.json({ id: session.id })
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }
}
