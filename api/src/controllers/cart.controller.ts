import { NextFunction, Request, Response } from 'express'
import Cart from '../models/cart.model'
import Order from '../models/order.model'
import User from '../models/user.model'
import { handleError } from '../utils/error'

import Stripe from 'stripe'
import { stripe } from '..'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
  }
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageId: string
}

// interface StripeEvent {
//   type: string
//   data: {
//     object: {
//       id: string
//     }
//   }
// }

export const addItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!Object.keys(req.body).length) {
      next(handleError(400, 'Request body cannot be empty'))
      next
    }

    const { id, quantity } = req.body

    const cartItem = await Cart.findOne({ id })
    if (!cartItem) {
      const newCartItem = await Cart.create(req.body)

      res.status(201).json(newCartItem)
    } else {
      cartItem.quantity += quantity
      await cartItem.save()

      res.status(200).json(cartItem)
    }
  } catch (error) {
    next(error)
  }
}

export const removeItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, quantity } = req.body

    const cartItem = await Cart.findOne({ id })

    if (!cartItem) {
      res.status(404).json({ message: 'Item not found' })
      return
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= quantity
      await cartItem.save()

      res.status(200).json(cartItem)
    } else if (cartItem.quantity === 1) {
      await cartItem.deleteOne()
      res.json({ message: 'Cart deleted' })
    }
  } catch (error) {
    next(error)
  }
}

export const getCartItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await Cart.find({ userRef: req.user?.id })

    console.log(items)
    res.json({ items })
  } catch (error) {
    next(error)
  }
}

export const clearCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Cart.deleteMany({ userRef: req.user?.id })

    res.status(200).json({ message: 'Cart items has been deleted!' })
  } catch (error) {
    next(error)
  }
}

export const checkout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cartItems: CartItem = req.body
    if (!cartItems || !Array.isArray(cartItems)) {
      res.status(400).json({ error: 'Invalid cart items' })
      return
    }

    const user = await User.findOne({ _id: req.user?.id })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const order = await Order.create({
      orders: req.body,
      userRef: req.user?.id,
      status: 'Placed',
      paymentStatus: 'Pending',
    })

    const lineItems = cartItems.map((cartItem) => {
      return {
        price_data: {
          currency: 'inr',
          unit_amount: Math.round(cartItem.price),
          product_data: {
            name: cartItem.name,
            images: [
              `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cartItem.imageId}`,
            ],
          },
        },
        quantity: parseInt(cartItem.quantity),
      }
    })

    //@ts-ignore
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user?.email,
      billing_address_collection: 'required',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      submit_type: 'pay',
      metadata: {
        userId: req.user?.id,
        orderId: order._id.toString(),
      },
    })

    // const session = await createSession(
    //   lineItems,
    //   'TEST_ORDER_ID',
    //   restaurant.deliveryPrice,
    //   restaurant._id.toString()
    // )

    res.json({ id: session.id })
  } catch (error) {
    next(error)
  }
}

// const createSession = async (
//   lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
//   orderId: string,
//   deliveryPrice: number,
//   restaurantId: string
// ) => {
//   const sessionData = await stripe.checkout.sessions.create({
//     line_items: lineItems,
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           display_name: 'Delivery',
//           type: 'fixed_amount',
//           fixed_amount: { amount: deliveryPrice, currency: 'inr' },
//         },
//       },
//     ],
//     mode: 'payment',
//     metadata: { orderId, restaurantId },
//     success_url: `${process.env.FRONTEND_URL}/order-status?success=true`,
//     cancel_url: `${process.env.FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
//   })

//   return sessionData
// }
