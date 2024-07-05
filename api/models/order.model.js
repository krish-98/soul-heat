import { Schema, model } from 'mongoose'

const orderItemSchema = new Schema({
  id: { type: String },
  name: { type: String },
  category: { type: String },
  description: { type: String },
  imageId: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const orderSchema = new Schema(
  {
    orders: [orderItemSchema],
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Order = model('Order', orderSchema)

export default Order
