import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { handleError } from '../utils/error.js'
import { generateTokens } from '../utils/token.js'

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({
      email: email,
    })

    if (existingUser) {
      return res.status(409).json({
        message: 'Email Id already exist, try logging in',
      })
    }

    await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res
      .status(201)
      .json({ message: 'User created successfully', success: true })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const isUserValid = await User.findOne({ email })
    if (!isUserValid) {
      return next(handleError(404, 'User not found'))
    }

    const isPasswordValid = await bcrypt.compare(password, isUserValid.password)
    if (!isPasswordValid) {
      return next(handleError(401, 'Wrong credentials'))
    }

    const { password: pass, ...rest } = isUserValid._doc

    // Generate Tokens
    const { access_token, refresh_token } = generateTokens(isUserValid._id)

    res.cookie('access_token', access_token, {
      maxAge: 15 * 60 * 1000,
      secure: true,
    })
    res.cookie('refresh_token', refresh_token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    })
    res.json({ message: 'Login successful!', success: true, user: rest })
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const { password: pass, ...rest } = existingUser._doc

      // Generate tokens
      const { access_token, refresh_token } = generateTokens(existingUser._id)

      res.cookie('access_token', access_token, {
        maxAge: 15 * 60 * 1000,
        secure: true,
      })
      res.cookie('refresh_token', refresh_token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      res.json({ message: 'Login successful!', success: true, user: rest })
    } else {
      // Generate a random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = await bcrypt.hash(generatedPassword, 10)

      const newUser = await User.create({
        username:
          name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: email,
        password: hashedPassword,
        avatar: photo,
      })
      const { password: pass, ...rest } = newUser._doc

      // Generate tokens
      const { access_token, refresh_token } = generateTokens(newUser._id)

      res.cookie('access_token', access_token, {
        maxAge: 15 * 60 * 1000,
        secure: true,
      })
      res.cookie('refresh_token', refresh_token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      res.json({ message: 'Login successful!', success: true, user: rest })
    }
  } catch (error) {
    next(error)
  }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')

    res.json({ message: 'User has been successfully logged out!' })
  } catch (error) {
    next(error)
  }
}
