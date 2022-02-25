import express from 'express'
import userCtrl from '../controllers/userCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.patch('/user', auth, userCtrl.updateUser)

router.post('/forgot', userCtrl.forgotPassword)

router.patch('/reset',auth, userCtrl.resetPassword)

router.post('/subscribe', auth, userCtrl.subscribe)

export default router