import express from "express"
import { createProfile, deleteProfile, getProfileById, updateProfile } from "../controllers/profileController.js"
import { authMiddleware, authorizeMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/', authMiddleware, authorizeMiddleware('seeker'), createProfile)
router.get('/:profileId', authMiddleware, getProfileById)
router.put('/:profileId', authMiddleware, authorizeMiddleware('seeker'), updateProfile)
router.delete('/:profileId', authMiddleware, authorizeMiddleware('seeker'), deleteProfile)

export default router