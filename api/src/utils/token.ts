import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15m',
  })
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d',
  })
}
