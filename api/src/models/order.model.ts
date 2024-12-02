import { Document, Schema, model } from 'mongoose'

interface IOrderItem {
  id?: string
  name?: string
  category?: string
  description?: string
  imageId?: string
  price?: number
  quantity?: number
}

interface IOrder extends Document {
  orders: IOrderItem[]
  userRef: Schema.Types.ObjectId
  status: 'Processing' | 'Failed' | 'Confirmed' | 'Delivered'
  createdAt?: Date
  updatedAt?: Date
}

const orderItemSchema = new Schema({
  id: { type: String },
  name: { type: String },
  category: { type: String },
  description: { type: String },
  imageId: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const orderSchema = new Schema<IOrder>(
  {
    orders: [orderItemSchema],
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Processing', 'Failed', 'Confirmed', 'Delivered'],
      required: true,
    },
  },
  { timestamps: true }
)

const Order = model<IOrder>('Order', orderSchema)

export default Order
