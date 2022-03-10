import express from 'express'
import orderCtrl from '../controllers/orderCtrl'
import auth from '../middleware/auth'
import mpesaAccessToken from '../middleware/mpesaAccessToken'
const router = express.Router()

router.post('/create_order', auth, orderCtrl.createOrder)

router.post('/stk_push',mpesaAccessToken, orderCtrl.stkPush)

router.post('/response', orderCtrl.response)

router.post('/mpesaResponse/:checkOutId', mpesaAccessToken, orderCtrl.mpesaResponse)

router.post('/stripe', auth, orderCtrl.stripePayment)

router.get('/user/orders/:id', auth, orderCtrl.getUserOrders)

router.get('/orders/:id', auth, orderCtrl.getOrderById)

router.get('/orders', auth, orderCtrl.getAllOrders)

router.patch('/orders/delivered/:id', auth, orderCtrl.updateOrders)

router.delete('/orders/:id', auth, orderCtrl.deleteOrder)

export default router