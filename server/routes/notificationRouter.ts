import express from 'express'
import notificationCtrl from '../controllers/notificationCtrl'
import auth from '../middleware/auth'
const router = express.Router()

router.get('/notification/user/:id', auth, notificationCtrl.getUserNotifications)

export default router