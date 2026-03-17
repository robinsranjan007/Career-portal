import express from "express"
import { createCompany, deleteCompany, getAllCompany, getCompanyById, updateCompany,getMyCompany } from "../controllers/companyController.js"
import { authMiddleware, authorizeMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/', authMiddleware, authorizeMiddleware('employer'), createCompany)
router.get('/', getAllCompany)
router.get('/my-company', authMiddleware, authorizeMiddleware('employer'), getMyCompany) // ← pehle
router.get('/:companyId', getCompanyById) // ← baad mein
router.put('/:companyId', authMiddleware, authorizeMiddleware('employer'), updateCompany)
router.delete('/:companyId', authMiddleware, authorizeMiddleware('employer'), deleteCompany)

export default router