import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

// export const signup = async (req, res) => {
//   try {
//     const existingUser = await User.findOne({ uid: req.body.uid })
//     console.log(existingUser)
//     if (existingUser) {
//       res.json(existingUser)
//       return
//     }

//     const user = await User.create(req.body)
//     if (user) {
//       res.status(201).json(user)
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
}
