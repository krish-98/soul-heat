import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { handleError } from '../utils/error.js'

export const signup = async (req, res, next) => {
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
    next(error)
  }
}

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const validUser = await User.findOne({ email })
    if (!validUser) {
      next(handleError(404, 'User not found'))
    }

    const decryptedPassword = bcrypt.compareSync(password, validUser.password)
    const validPassword = await User.findOne({ decryptedPassword })
    if (!validPassword) {
      next(handleError(401, 'Wrong credentials'))
    }

    const { password: userPW, ...rest } = validUser._doc
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expiresIn: '1h',
      })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}
