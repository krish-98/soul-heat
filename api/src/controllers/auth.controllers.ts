import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {
  oauthSchema,
  signInSchema,
  SignInUser,
  signUpSchema,
  SignUpUser,
} from '../schemas/user.schema'
import User from '../models/auth.model'
import { errorHandler } from '../utils/error'
import { generateRandomPassword } from '../utils/password'
import { generateAccessToken, generateRefreshToken } from '../utils/token'

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const parsedSignUpInput = signUpSchema.safeParse(req.body)
    if (!parsedSignUpInput.success) {
      return next(parsedSignUpInput.error)
    }

    const { username, email, password }: SignUpUser = parsedSignUpInput.data

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return next(errorHandler(400, 'User already exist, sign in to continue'))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    if (!user) {
      return next(errorHandler(500, "Account couldn't be created!"))
    }

    return res
      .status(201)
      .json({ success: true, message: 'Account created successfully!' })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const parsedSignInInput = signInSchema.safeParse(req.body)
    if (!parsedSignInInput.success) {
      return next(parsedSignInInput.error)
    }

    const { email, password }: SignInUser = parsedSignInInput.data

    const user = await User.findOne({ email })
    if (!user) {
      return next(errorHandler(401, 'Invalid email or password'))
    }

    const isValidPassword = bcrypt.compareSync(password, user?.password)
    if (!isValidPassword) {
      return next(errorHandler(401, 'Invalid email or password'))
    }

    const accessToken = generateAccessToken(user._id.toString())
    const refreshToken = generateRefreshToken(user._id.toString())

    res.cookie('accessToken', accessToken, { maxAge: 15 * 60 * 1000 })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === 'production' ? true : false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.json({ success: true, message: 'Login successfull!' })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const oauth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const parsedOauthInput = oauthSchema.safeParse(req.body)
    if (!parsedOauthInput.success) {
      return next(parsedOauthInput.error)
    }

    const { username, email, avatar } = parsedOauthInput.data

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.json({ success: true, message: 'OAuth login successful!' })
    } else {
      const randomPassword = generateRandomPassword()

      const user = await User.create({
        username,
        email,
        password: randomPassword,
        avatar,
      })

      if (!user) {
        return next(
          errorHandler(500, "Something went wrong, couldn't create an account!")
        )
      }

      const accessToken = generateAccessToken(user._id.toString())
      const refreshToken = generateRefreshToken(user._id.toString())

      res.cookie('accessToken', accessToken, { maxAge: 15 * 60 * 1000 })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === 'production' ? true : false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return res.json({ success: true, message: 'OAuth login successful!' })
    }
  } catch (error) {
    next(error)
  }
}
