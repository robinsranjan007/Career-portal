import express from "express"
import { applyJob, deleteApplicaiton, getJobApplication, getMyApplication, updateApplication } from "../controllers/applicationController.js"
import { authMiddleware, authorizeMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/:jobId', authMiddleware, authorizeMiddleware('seeker'), applyJob)
router.get('/', authMiddleware, authorizeMiddleware('seeker'), getMyApplication)
router.get('/:jobId', authMiddleware, authorizeMiddleware('employer'), getJobApplication)
router.put('/:applicationId', authMiddleware, authorizeMiddleware('employer'), updateApplication)
router.delete('/:applicationId', authMiddleware, authorizeMiddleware('seeker'), deleteApplicaiton)

export default router