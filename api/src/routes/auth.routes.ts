import express, { Handler } from 'express'
import { oauth, signIn, signUp } from '../controllers/auth.controllers'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
  //@ts-ignore
  keyGenerator: (req) => {
    console.log('Rate limit key (IP):', req.ip) // Debug: see what IP is being used
    return req.ip
  },
})

const router = express.Router()

router.post('/sign-up', signUp as Handler)
router.post('/sign-in', limiter, signIn as Handler)
router.post('/oauth', oauth as Handler)

export default router
