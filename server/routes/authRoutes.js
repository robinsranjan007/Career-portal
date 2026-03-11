import express from "express"
import { login, logout, refreshToken, registerUser } from "../controllers/authController.js"
import { authMiddleware } from '../middleware/authMiddleware.js'
import { getMe } from "../controllers/authController.js"

const router = express.Router()


router.post('/register',registerUser)
router.post('/login',login)
router.post('/logout',logout)
router.post('/refresh',refreshToken)
router.get("/me", authMiddleware, getMe)
export default router