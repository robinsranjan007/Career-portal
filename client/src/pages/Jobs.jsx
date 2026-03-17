import { setJobs } from "@/redux/slices/jobSlice";
import { getAllJob } from "@/services/jobService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock, ChevronRight, Search } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from '@/components/Spinner'

function Jobs() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 })

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    experience: '',
    sort: 'newest'
  })

  const fetchJobs = async (params) => {
    try {
      setLoading(true)
      const res = await getAllJob(params);
      dispatch(setJobs(res.data));
      setPagination(res.pagination)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs({ page: 1, limit: 10 })
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = () => {
    fetchJobs({ ...filters, page: 1, limit: 10 })
  }

  const handleReset = () => {
    const reset = { search: '', location: '', experience: '', sort: 'newest' }
    setFilters(reset)
    fetchJobs({ page: 1, limit: 10 })
  }

  const handlePageChange = (newPage) => {
    fetchJobs({ ...filters, page: newPage, limit: 10 })
  }

  if (loading) return <Spinner />

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-500 text-sm font-medium mb-1">Opportunities</p>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Browse All Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">{pagination.total} positions available</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">

        {/* Sidebar */}
        <div className="w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm">Filter & Sort</h3>
            <div className="h-px bg-gray-100"></div>

            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Search</label>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Position or skill..."
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="e.g. Toronto"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
            </div>

            {/* Experience */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Experience</label>
              <input
                type="text"
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                placeholder="e.g. 2 years"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
            </div>

            {/* Sort */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Sort By</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 transition"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="salary_high">Salary High to Low</option>
                <option value="salary_low">Salary Low to High</option>
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:from-teal-400 hover:to-green-400 transition"
            >
              Apply Filters
            </button>

            <button
              onClick={handleReset}
              className="w-full border border-gray-200 text-gray-500 text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Briefcase size={40} className="text-gray-200 mb-3" />
              <p className="text-gray-400 font-medium">No positions found</p>
              <button onClick={handleReset} className="mt-3 text-teal-600 text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all cursor-pointer p-6"
                    onClick={() => navigate(`/jobs/${job._id}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {job?.company?.companyLogo ? (
                          <img src={job.company.companyLogo} alt="logo"
                            className="w-12 h-12 rounded-xl object-contain border border-gray-100 flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                            <Briefcase size={20} className="text-teal-400" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold text-gray-900 truncate">{job?.jobPosition}</h2>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                              job?.jobstatus === 'open' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                            }`}>
                              {job?.jobstatus}
                            </span>
                          </div>
                          <p className="text-teal-600 text-sm font-medium mb-2">{job?.company?.companyName}</p>
                          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{job?.jobDescription}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {job?.jobSkills?.slice(0, 4).map((skill) => (
                              <span key={skill} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                                {skill}
                              </span>
                            ))}
                            {job?.jobSkills?.length > 4 && (
                              <span className="text-xs text-gray-400">+{job.jobSkills.length - 4} more</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><MapPin size={11} /> {job?.joblocation}</span>
                            <span className="flex items-center gap-1"><Briefcase size={11} /> {job?.jobExperience}</span>
                            <span className="flex items-center gap-1"><Clock size={11} /> {job?.salary}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-9 h-9 text-sm font-medium rounded-xl transition ${
                        p === pagination.page
                          ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white'
                          : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs;