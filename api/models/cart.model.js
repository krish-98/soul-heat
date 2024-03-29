import { Schema, model } from 'mongoose'

const cartSchema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    category: { type: String },
    description: { type: String },
    imageId: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    userRef: { type: String, required: true },
  },
  { timestamps: true }
)

const Cart = model('Cart', cartSchema)

export default Cart
