import mongoose, { model, Schema } from 'mongoose'

interface IUser {
  username: string
  email: string
  password: string
  avatar: string
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  if (!this.avatar) {
    this.avatar = `https://api.dicebear.com/9.x/micah/svg?seed=${this.username}&flip=true&radius=50&random=true`
  }

  next()
})

const User = model('User', userSchema)

export default User
