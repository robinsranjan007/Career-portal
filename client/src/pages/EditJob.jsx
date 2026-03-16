import { getJobById, updateJob } from '@/services/jobService';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditJob() {
  const { jobId } = useParams()
  const navigate = useNavigate() 
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [job, setJobs] = useState({
    jobPosition: "",
    jobDescription: "",
    jobSkills: "",
    jobExperience: "",
    salary: "",
    joblocation: "",
    jobstatus: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setJobs((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const res = await getJobById(jobId)
        setJobs({
          company: res.data.company,
          jobPosition: res.data.jobPosition,
          jobDescription: res.data.jobDescription,
          jobSkills: res.data.jobSkills.join(", "),
          jobExperience: res.data.jobExperience,
          salary: res.data.salary,
          joblocation: res.data.joblocation,
          jobstatus: res.data.jobstatus
        });
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getJobDetails()
  }, [])

  const handleUpdateJob = async (e) => {
    e.preventDefault()
    try {
      setUpdating(true)
      const formData = { ...job, jobSkills: job.jobSkills.split(",").map((s) => s.trim()) }
      await updateJob(jobId, formData)
      navigate('/employer/dashboard')
    } catch (error) {
      console.log(error)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Loading job details...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Job</h1>
          <p className="text-gray-500 mt-1 text-sm">Update your job posting details</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-teal-100 border border-gray-100 p-8">
          <form onSubmit={handleUpdateJob} className="space-y-5">

            {/* Row 1 — Position + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Job Position</label>
                <input
                  type="text"
                  name="jobPosition"
                  value={job.jobPosition}
                  onChange={handleOnChange}
                  placeholder="e.g. Frontend Developer"
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  name="joblocation"
                  value={job.joblocation}
                  onChange={handleOnChange}
                  placeholder="e.g. Toronto, Canada"
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
              </div>
            </div>

            {/* Row 2 — Salary + Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={job.salary}
                  onChange={handleOnChange}
                  placeholder="e.g. $80,000 - $100,000"
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Experience Required</label>
                <input
                  type="text"
                  name="jobExperience"
                  value={job.jobExperience}
                  onChange={handleOnChange}
                  placeholder="e.g. 2+ years"
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Required Skills</label>
              <input
                type="text"
                name="jobSkills"
                value={job.jobSkills}
                onChange={handleOnChange}
                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Job Description</label>
              <textarea
                rows={5}
                name="jobDescription"
                value={job.jobDescription}
                onChange={handleOnChange}
                placeholder="Describe the role, responsibilities..."
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-none"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Job Status</label>
              <select
                name="jobstatus"
                value={job.jobstatus}
                onChange={handleOnChange}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              >
                <option value="">Select status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => navigate('/employer/dashboard')}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-semibold py-3 rounded-xl text-sm shadow-lg shadow-teal-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? 'Updating...' : 'Update Job →'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditJob