import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { handleError } from '../utils/error'

interface UserPayload extends JwtPayload {
  id: string
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload
  token?: string
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.headers.authorization?.split(' ')[1]
  const refresh_token = req.cookies.refresh_token

  if (!refresh_token) return next(handleError(401, 'No Refresh Token'))

  if (!access_token) return next(handleError(401, 'No Access Token'))

  try {
    try {
      const decoded = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_TOKEN_SECRET as string
      )

      //Adding type guard
      if (typeof decoded === 'object' && decoded !== null) {
        req.user = decoded as UserPayload
        return next()
      }
    } catch (error) {
      const jwtError = error as jwt.JsonWebTokenError

      if (jwtError.name !== 'TokenExpiredError') {
        return next(handleError(401, 'Invalid Access Token'))
      }
    }

    const validateRefreshToken = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_SECRET as string
    )

    //Type guard
    if (
      typeof validateRefreshToken === 'object' &&
      validateRefreshToken !== null
    ) {
      const newAccessToken = jwt.sign(
        { id: (validateRefreshToken as UserPayload).id },
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1m' }
      )

      req.user = validateRefreshToken as UserPayload
      req.token = newAccessToken

      return next()
    } else {
      return next(handleError(401, 'Invalid Refresh Token'))
    }
  } catch (error) {
    const jwtError = error as jwt.JsonWebTokenError
    if (jwtError.name === 'TokenExpiredError') {
      return next(handleError(401, 'Refresh Token Expired'))
    }
    return next(handleError(401, 'Invalid Refresh Token'))
  }
}

export const sendTokenResponse = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json

  // Override the json method to inject token if it exists
  res.json = function (data) {
    // If a new access token was generated, add it to the response
    if (req.token) {
      // If data is an object, add token to it
      if (typeof data === 'object' && data !== null) {
        data.token = req.token
      }
    }

    // Call the original json method with modified data
    return originalJson.call(this, data)
  }

  next()
}
