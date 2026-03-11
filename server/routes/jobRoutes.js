import express from "express"
import { createJob, deleteJob, getAllJob, getJobById, getMyJobs, updateJob } from "../controllers/jobController.js"
import {authorizeMiddleware, authMiddleware } from '../middleware/authMiddleware.js'

const router= express.Router()


router.post('/',authMiddleware,authorizeMiddleware('employer'),createJob)
router.get('/',getAllJob)
router.get('/my-jobs',authMiddleware,authorizeMiddleware('employer'),getMyJobs)
router.get('/:jobId',getJobById)
router.put('/:jobId',authMiddleware,authorizeMiddleware('employer'),updateJob)
router.delete('/:jobId',authMiddleware,authorizeMiddleware('employer'),deleteJob)

export default router 