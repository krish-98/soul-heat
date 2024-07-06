import Order from '../models/order.model.js'

export const saveOrders = async (req, res) => {
  try {
    const orderDocument = await Order.create({ orders: req.body })

    res.json({ orderedItems: orderDocument })
  } catch (error) {
    console.error('Error saving orders:', error)
    res.status(500).json({ error: 'Failed to save orders' })
  }
}

export const orderDetails = async (req, res) => {
  try {
    const orders = await Order.find({ userRef: req.user.id }).sort({
      createdAt: -1,
    })

    res.json(orders)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error getting the order details' })
  }
}
