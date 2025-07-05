import mongoose, { model, Schema } from 'mongoose'

const cartItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userRef: { type: String, required: true },
})

const orderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // deliveryDetails: {
    //   email: { type: String, required: true },
    //   name: { type: String, required: true },
    //   addressLine1: { type: String, required: true },
    //   city: { type: String, required: true },
    // },
    cartItems: [cartItemSchema],
    status: {
      type: String,
      enum: ['placed', 'paid', 'inProgress', 'outForDelivery', 'delivered'],
      required: true,
    },
    totalAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const Order = model('Order', orderSchema)
export default Order
