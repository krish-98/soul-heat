import jwt from 'jsonwebtoken'

export const generateTokens = (userId) => {
  const access_token = jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' }
  )
  const refresh_token = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d',
    }
  )

  return { access_token, refresh_token }
}
