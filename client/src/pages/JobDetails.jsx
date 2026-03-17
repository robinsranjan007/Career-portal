import { applyJob, getMyApplication } from '@/services/applicationService'
import { getJobById } from '@/services/jobService'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { MapPin, DollarSign, Briefcase, CheckCircle, Building2 } from 'lucide-react'
import { getMyProfile } from '@/services/profileServie'
import toast from 'react-hot-toast'
import Spinner from '@/components/Spinner'

function JobDetails() {
  const { jobsId } = useParams()
  const [jobDetails, setJobDetails] = useState(null)
  const [application, setApplication] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const { user, loggedIn } = useSelector((data) => data.auth)
  const [hasResume,setHasResume]=useState(false)

const handleApplyJob = async () => {
  try {
    setApplying(true)
    await applyJob(jobsId)
    setApplication(prev => [...prev, { job: { _id: jobsId } }])
    toast.success('Applied successfully!')
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong')
  } finally {
    setApplying(false)
  }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
      const [jobRes, myProfile, applicationRes] = await Promise.all([
  getJobById(jobsId),
  user?.role === "seeker" ? getMyProfile().catch(() => ({ data: null })) : Promise.resolve({ data: null }),
  user?.role === "seeker" ? getMyApplication() : Promise.resolve({ data: [] })
])
        setJobDetails(jobRes.data)
        setApplication(applicationRes.data)
      if (myProfile.data?.resume) {
  setHasResume(true)
}

      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [jobsId, user])

  const alreadyApplied = application.some((app) => app.job._id == jobsId)

if (loading) return <Spinner />

  if (!jobDetails) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Job not found.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto flex items-start gap-5">
          {jobDetails?.company?.companyLogo ? (
            <img src={jobDetails.company.companyLogo} alt="logo"
              className="w-16 h-16 rounded-2xl object-contain border border-gray-100 shadow-sm flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
              <Building2 size={28} className="text-teal-400" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{jobDetails?.jobPosition}</h1>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                jobDetails?.jobstatus === 'open' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
              }`}>
                {jobDetails?.jobstatus}
              </span>
            </div>
            <p className="text-teal-600 font-medium">{jobDetails?.company?.companyName}</p>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
              <MapPin size={13} /> {jobDetails?.company?.companyLocation}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left */}
        <div className="md:col-span-2 space-y-6">

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 text-lg mb-3">About the Role</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{jobDetails?.jobDescription}</p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 text-lg mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {jobDetails?.jobSkills?.map((skill, i) => (
                <span key={i} className="bg-gray-50 border border-gray-200 text-gray-600 text-sm px-3 py-1 rounded-xl">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">

          {/* Job Meta */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                <DollarSign size={16} className="text-teal-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Salary</p>
                <p className="text-gray-900 font-semibold text-sm">{jobDetails?.salary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                <Briefcase size={16} className="text-teal-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Experience</p>
                <p className="text-gray-900 font-semibold text-sm">{jobDetails?.jobExperience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                <MapPin size={16} className="text-teal-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Location</p>
                <p className="text-gray-900 font-semibold text-sm">{jobDetails?.joblocation}</p>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          {user?.role === "seeker" && (
          <button
  onClick={handleApplyJob}
  disabled={alreadyApplied || applying || !hasResume}
  className={`w-full font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-200 ${
    alreadyApplied
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : !hasResume
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : applying
      ? 'bg-teal-100 text-teal-600 cursor-wait'
      : 'bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white shadow-lg shadow-teal-100'
  }`}
>
  {alreadyApplied
    ? '✓ Already Applied'
    : !hasResume
    ? '⚠ Upload resume to apply'
    : applying
    ? 'Submitting...'
    : 'Apply for this Position'}
</button>

          )}
          {!hasResume && (
  <Link to='/profile' className="text-teal-600 text-xs text-center block hover:underline">
    Complete your profile to apply →
  </Link>
)}


          {!loggedIn && (
            <p className="text-gray-500 text-sm border border-gray-100 bg-white rounded-2xl p-4 text-center">
              To apply, please{' '}
              <Link className="text-teal-600 font-medium hover:underline" to='/login'>login</Link>
              {' '}or{' '}
              <Link className="text-teal-600 font-medium hover:underline" to='/register'>register</Link>
            </p>
          )}

        </div>
      </div>
    </div>
  )
}

export default JobDetails