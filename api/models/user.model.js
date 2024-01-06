import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  providerId: { type: String },
  uid: { type: String },
  displayName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  photoURL: { type: String },
})

const User = model('User', userSchema)

export default User
