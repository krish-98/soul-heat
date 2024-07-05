import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
  {
    orders: [
      {
        id: { type: String },
        name: { type: String },
        category: { type: String },
        description: { type: String },
        imageId: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Order = model('Order', orderSchema)

export default Order
