import bcrypt from 'bcryptjs'
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

    const isPasswordValid = bcrypt.compareSync(password, validUser.password)
    if (!isPasswordValid) {
      next(handleError(401, 'Wrong credentials'))
      return
    }

    const { password: pass, ...rest } = validUser._doc
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    res
      .cookie('access_token', token, {
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body

    const user = await User.findOne({ email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc

      res
        .cookie('access_token', token, {
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10)

      const newUser = new User({
        username:
          name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: email,
        password: hashedPassword,
        avatar: photo,
      })
      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: 10,
      })
      const { password: pass, ...rest } = newUser._doc
      res
        .cookie('access_token', token, {
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.json('User has been logged out!')
  } catch (error) {
    next(error)
  }
}
