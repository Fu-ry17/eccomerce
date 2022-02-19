import express from "express";
import authCtrl from "../controllers/authCtrl";
const router = express.Router()

router.post('/register', authCtrl.register)

router.post('/activate', authCtrl.activate)

router.post('/login', authCtrl.login)

router.get('/refreshToken', authCtrl.refreshToken)

router.get('/logout', authCtrl.logout)

export default router
