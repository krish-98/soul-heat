import jwt, { decode } from 'jsonwebtoken'
import { handleError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token

  if (!access_token) {
    if (!refresh_token) {
      return next(handleError(401, 'No Refresh Token'))
    }

    try {
      const decoded = jwt.verify(
        refresh_token,
        process.env.JWT_REFRESH_TOKEN_SECRET
      )

      // Create new access token
      const newAccessToken = jwt.sign(
        { id: decodedRefreshToken.id },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      res.cookie('access_token', newAccessToken, {
        maxAge: 15 * 60 * 1000,
      })

      req.user = decoded
      next()
    } catch (error) {
      return next(handleError(401, 'Invalid Refresh Token'))
    }
  } else {
    try {
      const decoded = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      )

      req.user = decoded
      next()
    } catch (error) {
      return next(handleError(403, 'Forbidden'))
    }
  }
}
