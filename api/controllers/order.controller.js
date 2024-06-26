import Cart from '../models/cart.model.js'
import Order from '../models/order.model.js'

export const orderDetails = async (req, res) => {
  const orders = await Order.create(req.body)
  //   const userOrders = await Cart.findOne()

  res.json({ orderedItems: orders })
}

export const getOrderDetails = async (req, res) => {
  console.log(req.user)
  const orders = await Order.find({ userRef: req.user.id })
  console.log(orders)

  res.json(orders)
}
// getOrderDetails()
