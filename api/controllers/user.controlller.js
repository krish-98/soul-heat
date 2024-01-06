import User from '../models/user.model'

export const userInfo = async (req, res) => {
  try {
    const user = await User.create(req.body)

    if (user) {
      res.status(201).json(user)
    }
  } catch (error) {
    console.error(error)
  }
}
