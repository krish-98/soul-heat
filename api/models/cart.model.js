import { Schema, model } from 'mongoose'

const cartSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String },
    category: { type: String },
    description: { type: String },
    imageId: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const Cart = model('Cart', cartSchema)

export default Cart
