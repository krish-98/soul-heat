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

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    if (!user) {
      next(errorHandler(500, "Account couldn't be created!"))
    }

    return res.json({ success: true, message: 'Account created successfully!' })
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
      return next(errorHandler(404, 'User not found!'))
    }

    const comparedPassword = bcrypt.compareSync(
      password,
      user?.password as string
    )
    if (!comparedPassword) {
      return next(errorHandler(400, 'Enter correct password!'))
    }

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

      return res.json({ success: true, message: 'OAuth login successful!' })
    }
  } catch (error) {
    next(error)
  }
}
