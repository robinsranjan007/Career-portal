import { applyJob, getMyApplication } from '@/services/applicationService'
import { getJobById } from '@/services/jobService'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

function JobDetails() {
  const { jobsId } = useParams()
  const [jobDetails, setJobDetails] = useState(null)
  const [application, setApplication] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const { user,loggedIn } = useSelector((data) => data.auth)

  const handleApplyJob = async () => {
    try {
      setApplying(true)
      await applyJob(jobsId)
      setApplication(prev => [...prev, { job: { _id: jobsId } }])
    } catch (error) {
      console.log(error)
    } finally {
      setApplying(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [jobRes, applicationRes] = await Promise.all([
          getJobById(jobsId),
          user?.role === "seeker" ? getMyApplication() : Promise.resolve({ data: [] })
        ])
        setJobDetails(jobRes.data)
        setApplication(applicationRes.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [jobsId, user])

  const alreadyApplied = application.some((app) => app.job._id == jobsId)

  if (loading) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-amber-800 font-serif text-xl animate-pulse">Loading position...</div>
    </div>
  )

  if (!jobDetails) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-amber-800 font-serif text-xl">Job not found.</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header Banner */}
      <div className="bg-amber-900 border-b-4 border-amber-600 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-300 font-serif text-sm uppercase tracking-widest mb-2">
            Career Opportunity
          </p>
          <h1 className="text-white font-serif text-4xl font-bold mb-1">
            {jobDetails?.jobPosition}
          </h1>
          <p className="text-amber-300 font-serif text-lg">
            {jobDetails?.company?.companyName} &mdash; {jobDetails?.company?.companyLocation}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left — Main Details */}
        <div className="md:col-span-2 space-y-6">

          {/* Description */}
          <div className="bg-white border-2 border-amber-200 rounded-md p-6">
            <h2 className="font-serif text-amber-900 text-xl font-bold mb-3 border-b border-amber-200 pb-2">
              About the Role
            </h2>
            <p className="text-amber-800 font-serif leading-relaxed">
              {jobDetails?.jobDescription}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white border-2 border-amber-200 rounded-md p-6">
            <h2 className="font-serif text-amber-900 text-xl font-bold mb-3 border-b border-amber-200 pb-2">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {jobDetails?.jobSkills?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-amber-100 border border-amber-400 text-amber-900 font-serif text-sm px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right — Sidebar */}
        <div className="space-y-4">

          {/* Company Card */}
          <div className="bg-white border-2 border-amber-200 rounded-md p-5">
            {jobDetails?.company?.companyLogo && (
              <img
                src={jobDetails.company.companyLogo}
                alt="Company Logo"
                className="h-14 w-14 object-contain mb-3 border border-amber-200 rounded p-1"
              />
            )}
            <h3 className="font-serif text-amber-900 font-bold text-lg">
              {jobDetails?.company?.companyName}
            </h3>
            <p className="text-amber-700 font-serif text-sm mt-1">
              📍 {jobDetails?.company?.companyLocation}
            </p>
          </div>

          {/* Job Meta */}
          <div className="bg-white border-2 border-amber-200 rounded-md p-5 space-y-3">
            <div>
              <p className="text-amber-500 font-serif text-xs uppercase tracking-widest">Experience</p>
              <p className="text-amber-900 font-serif font-semibold">{jobDetails?.jobExperience}</p>
            </div>
            <div>
              <p className="text-amber-500 font-serif text-xs uppercase tracking-widest">Salary</p>
              <p className="text-amber-900 font-serif font-semibold">{jobDetails?.salary}</p>
            </div>
            <div>
              <p className="text-amber-500 font-serif text-xs uppercase tracking-widest">Status</p>
              <span className={`inline-block font-serif text-sm px-2 py-1 rounded border ${
                jobDetails?.jobstatus === 'open'
                  ? 'bg-green-50 border-green-400 text-green-800'
                  : 'bg-red-50 border-red-400 text-red-800'
              }`}>
                {jobDetails?.jobstatus}
              </span>
            </div>
          </div>

          {/* Apply Button */}
          {user?.role === "seeker" && (
            <button
              onClick={handleApplyJob}
              disabled={alreadyApplied || applying}
              className={`w-full font-serif text-base py-3 px-4 rounded-md border-2 transition-all duration-200 ${
                alreadyApplied
                  ? 'bg-amber-100 border-amber-300 text-amber-500 cursor-not-allowed'
                  : applying
                  ? 'bg-amber-200 border-amber-400 text-amber-700 cursor-wait'
                  : 'bg-amber-800 border-amber-900 text-amber-50 hover:bg-amber-700 cursor-pointer'
              }`}
            >
              {alreadyApplied ? '✓ Already Applied' : applying ? 'Submitting...' : 'Apply for this Position'}
            </button>
            
          )}
         {!loggedIn && (
  <p className="font-serif text-amber-800 text-sm border border-amber-200 bg-white rounded-md p-3 text-center">
    To apply, please{' '}
    <Link className="text-amber-600 underline hover:text-amber-900" to='/login'>
      login
    </Link>{' '}
    <Link to='/register'>
    or register
    
    </Link>
  </p>
)}
        </div>
      </div>
    </div>
  )
}

export default JobDetails