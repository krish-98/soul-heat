import { Router } from 'express'

import { userInfo } from '../controllers/user.controlller'

const router = Router()

router.post('/', userInfo)

export default router
