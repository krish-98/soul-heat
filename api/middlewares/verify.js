import jwt from 'jsonwebtoken'
import { handleError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
  const access_token = req.headers.authorization?.split(' ')[1]
  const refresh_token = req.cookies.refresh_token

  if (!refresh_token) {
    return next(handleError(401, 'No Refresh Token'))
  }

  if (!access_token) {
    return next(handleError(401, 'No Access Token'))
  }

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
    res.json({ token: newAccessToken })
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(handleError(401, 'Refresh Token Expired'))
    }
    return next(handleError(401, 'Invalid Refresh Token'))
  }
}

// export const verifyToken = (req, res, next) => {
//   // if (!req.headers.authorization) {
//   //   return next(handleError(401, 'No Authorization Header'))
//   // }

//   const access_token = req.headers.authorization.split(' ')[1]
//   const refresh_token = req.cookies.refresh_token

//   if (!access_token) {
//     if (!refresh_token) {
//       return next(handleError(401, 'No Refresh Token'))
//     }

//     try {
//       const decoded = jwt.verify(
//         refresh_token,
//         process.env.JWT_REFRESH_TOKEN_SECRET
//       )

//       // Create new access token
//       const newAccessToken = jwt.sign(
//         { id: decodedRefreshToken.id },
//         process.env.JWT_ACCESS_TOKEN_SECRET,
//         { expiresIn: '15m' }
//       )

//       res.set('access_token', newAccessToken, {
//         maxAge: 15 * 60 * 1000,
//       })

//       req.user = decoded
//       next()
//     } catch (error) {
//       return next(handleError(401, 'Invalid Refresh Token'))
//     }
//   } else {
//     try {
//       const decoded = jwt.verify(
//         access_token,
//         process.env.JWT_ACCESS_TOKEN_SECRET
//       )

//       console.log(decoded)
//       req.user = decoded
//       next()
//     } catch (error) {
//       console.log(error)
//       return next(handleError(403, 'Forbidden'))
//     }
//   }
// }
