import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/errorHandler'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return next(errorHandler(401, 'Unauthorized! access token is missing'))
  }

  console.log(`Access token: ${token}`)

  jwt.verify(
    token as string,
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) throw next(err)

      //@ts-ignore
      req.user = decoded?.userId
      next()
    }
  )
}
