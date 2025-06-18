import crypto from 'crypto'

export const generateRandomPassword = (length: number = 32) => {
  return crypto.randomBytes(length).toString('hex') // 32 bytes → 64 characters
}
