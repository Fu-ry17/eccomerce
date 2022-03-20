import express from 'express'
import notificationCtrl from '../controllers/notificationCtrl'
import auth from '../middleware/auth'
const router = express.Router()

router.get('/notification/user/:id', auth, notificationCtrl.getUserNotifications)
 
router.route('/notification/:id')
      .patch(auth, notificationCtrl.readNotify)
      .delete(auth, notificationCtrl.deleteNotify)

export default router