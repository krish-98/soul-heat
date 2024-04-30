import { stripe } from '../index.js'
import Cart from '../models/cart.model.js'

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

    const lineItems = cartItems.map((cartItem) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: cartItem.name,
            images: [`${process.env.CLOUDINARY_URL}${cartItem.imageId}`],
          },
          unit_amount: Math.round(cartItem.price),
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: cartItem.quantity,
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
    })

    res.json({ id: session.id })
  } catch (error) {
    next(error)
  }
}
