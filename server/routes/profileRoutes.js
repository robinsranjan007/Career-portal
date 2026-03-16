import express from "express"
import { createProfile, deleteProfile, getProfileById, updateProfile ,getMyProfile, updateProfilePhoto, updateResume} from "../controllers/profileController.js"
import { authMiddleware, authorizeMiddleware } from "../middleware/authMiddleware.js"
import { uploadProfilePhoto, uploadResume } from "../config/cloudinary.js"

const router = express.Router()

router.post('/', authMiddleware, authorizeMiddleware('seeker'), createProfile)
router.get('/me', authMiddleware, getMyProfile)
router.get('/:profileId', authMiddleware, getProfileById)
router.put('/:profileId', authMiddleware, authorizeMiddleware('seeker'), updateProfile)
router.delete('/:profileId', authMiddleware, authorizeMiddleware('seeker'), deleteProfile)
router.put('/:profileId/photo', authMiddleware, uploadProfilePhoto.single('profilePhoto'), updateProfilePhoto)
router.put('/:profileId/resume', authMiddleware, uploadResume.single('resume'), updateResume)

export default router