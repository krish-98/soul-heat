import { NextFunction, Request, Response } from 'express'
import Cart, { ICart } from '../models/cart.model'
import {
  addCartItemSchema,
  AddItem,
  removeCartItemSchema,
} from '../schemas/cart.schema'
import { HydratedDocument } from 'mongoose'
import { errorHandler } from '../utils/errorHandler'

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
    //@ts-ignore
    console.log(`Inside the handler:`, req.user)
    res.json({ succcss: true, message: 'Item added to cart' })
  } catch (error) {}
}

export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
}

export const checkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
}
