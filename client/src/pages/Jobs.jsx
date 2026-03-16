import { setJobs } from "@/redux/slices/jobSlice";
import { getAllJob } from "@/services/jobService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock, ChevronRight, Search } from "lucide-react";

function Jobs() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGetAllJobs = async () => {
      try {
        const res = await getAllJob();
        dispatch(setJobs(res.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGetAllJobs();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Loading jobs...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-500 text-sm font-medium mb-1">Opportunities</p>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Browse All Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">{jobs.length} positions available</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">

        {/* Sidebar */}
        <div className="w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">Filter & Sort</h3>
            <div className="h-px bg-gray-100 mb-4"></div>
            <p className="text-gray-400 text-xs">Filters coming soon...</p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Briefcase size={40} className="text-gray-200 mb-3" />
              <p className="text-gray-400 font-medium">No positions available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all cursor-pointer p-6"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  <div className="flex items-start justify-between gap-4">

                    {/* Left */}
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
                            job?.jobstatus === 'open'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-red-50 text-red-500'
                          }`}>
                            {job?.jobstatus}
                          </span>
                        </div>

                        <p className="text-teal-600 text-sm font-medium mb-2">{job?.company?.companyName}</p>

                        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                          {job?.jobDescription}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {job?.jobSkills?.slice(0, 4).map((skill) => (
                            <span key={skill}
                              className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                              {skill}
                            </span>
                          ))}
                          {job?.jobSkills?.length > 4 && (
                            <span className="text-xs text-gray-400">+{job.jobSkills.length - 4} more</span>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {job?.joblocation}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={11} /> {job?.jobExperience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {job?.salary}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight size={18} className="text-gray-300 flex-shrink-0 mt-1" />
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

export default Jobs;