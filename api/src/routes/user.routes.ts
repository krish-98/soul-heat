import { Router } from 'express'
import { google, signin, signout, signup } from '../controllers/user.controller'

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google)
router.get('/signout', signout)

export default router
