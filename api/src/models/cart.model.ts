import { Schema, model } from 'mongoose'

interface ICart extends Document {
  id: string
  name?: string
  category?: string
  description?: string
  imageId?: string
  price: number
  quantity: number
  userRef: Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}

const cartSchema = new Schema<ICart>(
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

const Cart = model<ICart>('Cart', cartSchema)

export default Cart
