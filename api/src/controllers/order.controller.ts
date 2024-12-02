import { Request, Response } from 'express'
import Order from '../models/order.model'

interface SaveOrdersRequest extends Request {
  body: {
    orders: Array<{
      productId: string
      quantity: number
      price: number
    }> // Adjust fields as per your actual data structure
  }
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
  }
}

export const saveOrders = async (req: SaveOrdersRequest, res: Response) => {
  try {
    const orderDocument = await Order.create({ orders: req.body })

    res.json({ orderedItems: orderDocument })
  } catch (error) {
    console.error('Error saving orders:', error)
    res.status(500).json({ error: 'Failed to save orders' })
  }
}

export const orderDetails = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find({ userRef: req.user?.id }).sort({
      createdAt: -1,
    })

    res.json(orders)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred', error)
    }
    res.status(500).json({ error: 'Error getting the order details' })
  }
}
