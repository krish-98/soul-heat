import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
)

// Pre-save middleware to set the avatar based on the username
userSchema.pre('save', function (next) {
  const fallbackAvatarUrl =
    'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png'

  if (!this.avatar) {
    if (this.username) {
      this.avatar = `https://api.dicebear.com/9.x/micah/svg?seed=${this.username}&flip=true&radius=50&random=true`
    } else {
      this.avatar = fallbackAvatarUrl
    }
  }
  next()
})

const User = model('User', userSchema)

export default User
