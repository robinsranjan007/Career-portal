import { getStats } from '@/services/statsService'
import { getAllJob } from '@/services/jobService'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Building2, Users, MapPin, Clock, ChevronRight, ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'

function Home() {
  const [stats, setStats] = useState({ totalJobs: 0, totalCompanies: 0, totalUsers: 0 })
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { loggedIn, user } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, jobsRes] = await Promise.all([
          getStats(),
          getAllJob({ limit: 6, page: 1 })
        ])
        setStats(statsRes.data)
        setFeaturedJobs(jobsRes.data)
      } catch (_) {
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-green-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-teal-50 border border-teal-200 text-teal-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            🚀 Your Career Starts Here
          </span>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
            Find Your Dream Job <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-500">
              With CareerPortal
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Connect with top employers, discover opportunities that match your skills, and take the next step in your career journey.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/jobs')}
              className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-200 transition-all duration-200 flex items-center gap-2"
            >
              Browse Jobs <ArrowRight size={16} />
            </button>
            {!loggedIn && (
              <button
                onClick={() => navigate('/register')}
                className="border border-gray-200 bg-white text-gray-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
              >
                Get Started <ChevronRight size={16} />
              </button>
            )}
            {loggedIn && user?.role === 'employer' && (
              <button
                onClick={() => navigate('/employer/post-job')}
                className="border border-gray-200 bg-white text-gray-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
              >
                Post a Job <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
              <Briefcase size={22} className="text-teal-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalJobs}+</p>
            <p className="text-gray-500 text-sm mt-1 font-medium">Jobs Available</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-3">
              <Building2 size={22} className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalCompanies}+</p>
            <p className="text-gray-500 text-sm mt-1 font-medium">Companies Hiring</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <Users size={22} className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalUsers}+</p>
            <p className="text-gray-500 text-sm mt-1 font-medium">Job Seekers</p>
          </div>
        </div>

        {/* Featured Jobs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
              <p className="text-gray-500 text-sm mt-1">Latest opportunities just for you</p>
            </div>
            <button
              onClick={() => navigate('/jobs')}
              className="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded mb-3 w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
                  <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all cursor-pointer p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {job?.company?.companyLogo ? (
                      <img src={job.company.companyLogo} alt="logo" className="w-10 h-10 rounded-xl object-contain border border-gray-100 flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <Briefcase size={18} className="text-teal-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{job?.jobPosition}</h3>
                      <p className="text-teal-600 text-xs font-medium">{job?.company?.companyName}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-auto ${
                      job?.jobstatus === 'open' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {job?.jobstatus}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job?.jobSkills?.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {job?.joblocation}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {job?.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      {!loggedIn && (
        <div className="bg-gradient-to-r from-teal-500 to-green-500 mt-16">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-teal-100 mb-8">Join thousands of job seekers and employers on CareerPortal</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-xl hover:bg-teal-50 transition"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate('/jobs')}
                className="border border-teal-300 text-white font-semibold px-8 py-3 rounded-xl hover:bg-teal-400 transition"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home