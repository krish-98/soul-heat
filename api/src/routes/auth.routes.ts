import express, { Handler } from 'express'
import { oauth, signIn, signUp } from '../controllers/auth.controllers'

const router = express.Router()

router.post('/sign-up', signUp as Handler)
router.post('/sign-in', signIn as Handler)
router.post('/oauth', oauth as Handler)

export default router
