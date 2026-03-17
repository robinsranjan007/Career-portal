import User from '../models/User.js'
import Job from '../models/Jobs.js'
import Company from '../models/Company.js'

export const getStats = async (req, res) => {
  try {
    const [totalJobs, totalCompanies, totalUsers] = await Promise.all([
      Job.countDocuments(),
      Company.countDocuments(),
      User.countDocuments()
    ])
    return res.status(200).json({ success: true, data: { totalJobs, totalCompanies, totalUsers } })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}