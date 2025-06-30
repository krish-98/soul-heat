import { Document, model, Schema } from 'mongoose'

export interface ICart extends Document {
  id: string
  name: string
  category: string
  description: string
  imageId: string
  price: number
  quantity: number
  userRef: Schema.Types.ObjectId
}

const cartSchema = new Schema<ICart>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    imageId: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
)

const Cart = model('Cart', cartSchema)

export default Cart
