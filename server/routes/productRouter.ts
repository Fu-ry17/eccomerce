import express from 'express'
import productCtrl from '../controllers/productCtrl'
import auth from '../middleware/auth'
import validProducts from '../middleware/validProducts'
const router = express.Router()

router.post('/products', auth, validProducts, productCtrl.createProduct)

router.get('/products/shop', productCtrl.getProducts)

router.get('/category/products/:id', productCtrl.getProductsByCategory)

router.get('/admin/products', productCtrl.getAllProducts)

export default router