import { NextFunction, Request, Response } from 'express'
import Order from '../models/order.model'
import Stripe from 'stripe'
import { stripe } from '..'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
  }
}

// export const orderDetails = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   try {
//     const orders = await Order.find({ userRef: req.user?.id }).limit(5).sort({
//       createdAt: -1,
//     })

//     console.log(orders.length)
//     res.json({ orders })
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message)
//     } else {
//       console.error('An unknown error occurred', error)
//     }
//     res.status(500).json({ error: 'Error getting the order details' })
//   }
// }

export const orderDetails = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = parseInt(req.query.skip as string) || 0 // Default to 0 if not provided
    const limit = 5 // Fixed limit for each request

    const orders = await Order.find({ userRef: req.user?.id })
      .sort({ createdAt: -1 }) // Fetch latest orders first
      .skip(skip)
      .limit(limit)

    const totalOrders = await Order.countDocuments({ userRef: req.user?.id })

    const hasMore = skip + orders.length < totalOrders // Check if more orders are available

    res.json({
      orders,
      hasMore,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred', error)
    }
    res.status(500).json({ error: 'Error getting the order details' })
  }
}

export const stripeWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('Received events')
  console.log('=========================')

  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!endPointSecret) {
    res.status(500).send('Server configuration error')
    return
  }

  const sig = req.headers['stripe-signature']
  if (!sig) {
    console.error('Missing Stripe signature header')
    res.status(400).send('Missing Stripe signature header')
    return
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endPointSecret)
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
    } else {
      console.error('Webhook Error: An unknown error occurred')
      res.status(400).send('Webhook Error: An unknown error occurred')
    }
    return
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event.data.object.metadata)

    //@ts-ignore
    const { userId, orderId } = event.data.object?.metadata

    await Order.findByIdAndUpdate(orderId, { status: 'Paid' })
  }

  res.status(200).send()
}
