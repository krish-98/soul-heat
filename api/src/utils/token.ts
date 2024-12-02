import jwt from 'jsonwebtoken'

interface Token {
  access_token: string
  refresh_token: string
}

export const generateTokens = (userId: string) => {
  const access_token = jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    { expiresIn: '1m' }
  )
  const refresh_token = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '1d',
    }
  )

  return { access_token, refresh_token }
}
