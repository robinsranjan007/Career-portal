import { deleteJob, getMyJobs } from '@/services/jobService'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, MapPin, DollarSign, Users, Edit, Trash2, ChevronRight } from 'lucide-react'
 

function EmployerDashboard() {
  const [totalJobsPosted, setTotalJobsPosted] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyJobs()
        setTotalJobsPosted(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete=async(jobId)=>{

    try {
      await deleteJob(jobId)
      setTotalJobsPosted((prev)=>prev.filter((job)=>job._id!==jobId))
    } catch (error) {
      console.log(error)
    }
  }

  const openJobs = totalJobsPosted.filter(job => job.jobstatus === 'open').length
  const closedJobs = totalJobsPosted.filter(job => job.jobstatus === 'closed').length

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Employer Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your job postings and applicants</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
              <Briefcase size={20} className="text-teal-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalJobsPosted.length}</p>
              <p className="text-xs text-gray-500 font-medium">Total Jobs</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <ChevronRight size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{openJobs}</p>
              <p className="text-xs text-gray-500 font-medium">Open Jobs</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <Briefcase size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{closedJobs}</p>
              <p className="text-xs text-gray-500 font-medium">Closed Jobs</p>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Your Job Postings</h2>
            <button
              onClick={() => navigate('/employer/post-job')}
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:from-teal-400 hover:to-green-400 transition"
            >
              + Post New Job
            </button>
          </div>

          {totalJobsPosted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Briefcase size={40} className="text-gray-200 mb-3" />
              <p className="text-gray-400 font-medium">No jobs posted yet</p>
              <p className="text-gray-300 text-sm mt-1">Click "Post New Job" to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {totalJobsPosted.map((job) => (
                <div key={job._id} className="px-6 py-5 hover:bg-gray-50 transition flex items-center justify-between gap-4">
                  
                  {/* Left */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {job?.company?.companyLogo ? (
                      <img src={job.company.companyLogo} alt="logo" className="w-10 h-10 rounded-xl object-contain border border-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                        <Briefcase size={18} className="text-teal-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{job?.jobPosition}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={11} /> {job?.company?.companyLocation}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <DollarSign size={11} /> {job?.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    job?.jobstatus === 'open'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-500'
                  }`}>
                    {job?.jobstatus}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/employer/applicants/${job._id}`)}
                      className="flex items-center gap-1.5 text-xs font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-xl transition"
                    >
                      <Users size={13} /> Applicants
                    </button>
                    <button
                      onClick={() => navigate(`/employer/edit-job/${job._id}`)}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition"
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button  onClick={()=>handleDelete(job._id)} className="flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition">
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default EmployerDashboard