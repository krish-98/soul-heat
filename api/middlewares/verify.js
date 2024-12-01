import jwt from 'jsonwebtoken'
import { handleError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
  const access_token = req.headers.authorization?.split(' ')[1]
  const refresh_token = req.cookies.refresh_token

  if (!refresh_token) return next(handleError(401, 'No Refresh Token'))

  if (!access_token) return next(handleError(401, 'No Access Token'))

  try {
    try {
      const decoded = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      )

      req.user = decoded
      return next()
    } catch (accessError) {
      if (accessError.name !== 'TokenExpiredError') {
        return next(handleError(401, 'Invalid Access Token'))
      }
    }

    const validateRefreshToken = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_SECRET
    )

    const newAccessToken = jwt.sign(
      { id: validateRefreshToken.id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    )

    req.user = validateRefreshToken
    req.token = newAccessToken

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(handleError(401, 'Refresh Token Expired'))
    }
    return next(handleError(401, 'Invalid Refresh Token'))
  }
}

export const sendTokenResponse = (req, res, next) => {
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
