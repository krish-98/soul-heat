import { Request, Response, NextFunction } from 'express'
import { stripe } from '..'
import Order from '../models/order.model'
import { errorHandler } from '../utils/errorHandler'

export const webhookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let event

  try {
    const sig = req.headers['stripe-signature']
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string
    )
  } catch (error: any) {
    console.error(error)
    return res.status(400).send(`Webhook error: ${error.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const order = await Order.findById(event.data.object.metadata?.orderId)

    if (!order) {
      return next(errorHandler(404, 'Order not found!'))
    }

    order.totalAmount = event.data.object.amount_total
    order.status = 'paid'

    await order.save()
  }

  res.status(200).send()
}

export const orderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.error(Error)
    return next(error)
  }
}

export const orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({
      //@ts-ignore
      user: req.user,
    })

    if (!orders.length) {
      return res.json({
        success: true,
        message: 'No orders yet!',
        data: [],
      })
    }

    return res.json({ success: true, data: orders })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// const fulfillCheckout = async (sessionId: string) => {
//   console.log('Fulfilling Checkout Session ' + sessionId)

//   // TODO: Make this function safe to run multiple times,
//   // even concurrently, with the same session ID

//   // TODO: Make sure fulfillment hasn't already been
//   // performed for this Checkout Session

//   // Retrieve the Checkout Session from the API with line_items expanded
//   const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
//     expand: ['line_items'],
//   })

//   // Check the Checkout Session's payment_status property
//   // to determine if fulfillment should be performed
//   if (checkoutSession.payment_status !== 'unpaid') {
//     // TODO: Perform fulfillment of the line items
//     // TODO: Record/save fulfillment status for this
//     // Checkout Session
//   }
// }

// export const productFulfillment = async (req: Request, res: Response) => {
//   const payload = req.body
//   const sig = req.headers['stripe-signature']

//   let event

//   try {
//     event = stripe.webhooks.constructEvent(
//       payload,
//       sig as string,
//       process.env.STRIPE_WEBHOOK_SECRET_KEY as string
//     )
//   } catch (err) {
//     //@ts-ignore
//     return res.status(400).send(`Webhook Error: ${err.message}`)
//   }

//   if (
//     event.type === 'checkout.session.completed' ||
//     event.type === 'checkout.session.async_payment_succeeded'
//   ) {
//     fulfillCheckout(event.data.object.id)
//   }

//   console.log(`Webhook succeeded`)
//   res.status(200).end()
// }
