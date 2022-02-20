import express from 'express'
import orderCtrl from '../controllers/orderCtrl'
import auth from '../middleware/auth'
import mpesaAccessToken from '../middleware/mpesaAccessToken'
const router = express.Router()

router.post('/create_order', auth, orderCtrl.createOrder)

router.post('/stk_push',mpesaAccessToken, auth, orderCtrl.stkPush)

router.post('/response', orderCtrl.response)

router.get('/user/orders/:id', auth, orderCtrl.getUserOrders)


export default router