import { NextFunction, Request, Response } from 'express'
import Cart from '../models/cart.model'
import {
  addCartItemSchema,
  cartItemsArraySchema,
  removeCartItemSchema,
} from '../schemas/cart.schema'
import { errorHandler } from '../utils/errorHandler'
import { stripe } from '..'
import User from '../models/auth.model'
import Order from '../models/order.model'

export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedCartItem = addCartItemSchema.safeParse(req.body)
    if (!parsedCartItem.success) {
      return next(parsedCartItem.error)
    }

    const { id, quantity } = parsedCartItem.data
    const cartItem = await Cart.findOne({ id })

    if (cartItem) {
      cartItem.quantity += quantity
      await cartItem.save()

      return res.json({ suceess: true, data: cartItem })
    } else {
      const newCartItem = await Cart.create(parsedCartItem.data)

      return res.status(201).json({ success: true, data: newCartItem })
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const removeItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedCartItem = removeCartItemSchema.safeParse({
      id: req.params.id,
      quantity: req.body.quantity,
    })
    if (!parsedCartItem.success) {
      return next(parsedCartItem.error)
    }

    const { id, quantity } = parsedCartItem.data

    const cartItem = await Cart.findOne({ id })
    if (!cartItem) {
      return next(errorHandler(404, 'No cart item found!'))
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= quantity
      await cartItem.save()

      return res.json({
        success: true,
        message: 'Cart Item reduced',
        data: cartItem,
      })
    }

    if (cartItem.quantity === 1 || cartItem.quantity - quantity <= 0) {
      await cartItem.deleteOne()

      return res.json({
        sucess: true,
        message: 'Cart item removed successfully',
        data: {
          id: cartItem.id,
        },
      })
    }
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems = await Cart.find({
      //@ts-ignore
      userRef: req.user,
    })

    res.json({ success: true, data: cartItems })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Cart.deleteMany({
      //@ts-ignore
      userRef: req.user,
    })

    return res.json({
      success: true,
      message: 'All items have been removed the cart!',
    })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const checkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedCartItems = cartItemsArraySchema.safeParse(req.body)
    if (!parsedCartItems.success) {
      return next(parsedCartItems.error)
    }

    const user = await User.findOne({
      //@ts-ignore
      _id: req.user,
    })
    if (!user) {
      return next(errorHandler(404, 'user not found'))
    }

    const order = await Order.create({
      //@ts-ignore
      user: req?.user,
      cartItems: parsedCartItems.data,
      status: 'placed',
    })

    const lineItems = parsedCartItems.data.map((item) => ({
      price_data: {
        currency: 'inr',
        unit_amount: Math.round(item.price),
        product_data: {
          name: item.name,
          description: item.description,
          images: [`${process.env.IMAGE_URL}/${item.imageId}`],
        },
      },
      quantity: item.quantity,
    }))

    //@ts-ignore
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user?.email,
      billing_address_collection: 'required',
      submit_type: 'pay',
      // success_url: `${process.env.FRONTEND_URL}/success`,
      // cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      success_url: `${process.env.FRONTEND_URL}/order-status?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/detail?cancelled=true`,
      metadata: {
        //@ts-ignore
        userId: req?.user,
        orderId: order._id.toString(),
      },
    })

    console.log(`Session id: ${session.id} & Session url: ${session.url}`)

    res.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}
