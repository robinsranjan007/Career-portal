import { setJobs } from "@/redux/slices/jobSlice";
import { getAllJob } from "@/services/jobService";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";

function Jobs() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetAllJobs = async () => {
      try {
        const res = await getAllJob();
        dispatch(setJobs(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllJobs();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50"
      style={{ backgroundImage: "radial-gradient(#d4a96a22 1px, transparent 1px)", backgroundSize: "20px 20px" }}>

      {/* Header */}
      <div className="border-b-2 border-amber-800 bg-amber-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px bg-amber-700 w-8"></div>
            <span className="text-amber-700 text-xs uppercase tracking-widest">Opportunities</span>
            <div className="h-px bg-amber-700 w-8"></div>
          </div>
          <h1 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
            Browse All Jobs
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">

        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <div className="border-2 border-amber-800 bg-amber-50 p-5 shadow-[4px_4px_0px_#92400e]">
            <h3 className="font-bold text-amber-900 uppercase tracking-wide text-sm mb-4"
              style={{ fontFamily: 'Georgia, serif' }}>
              Filter & Sort
            </h3>
            <div className="h-px bg-amber-200 mb-4"></div>
            <p className="text-amber-600 text-xs italic">Filters coming soon...</p>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="flex-1">
          {jobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-amber-700 text-lg" style={{ fontFamily: 'Georgia, serif' }}>No positions available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <div key={job._id}
                  className="border-2 border-amber-800 bg-amber-50 p-6 shadow-[4px_4px_0px_#92400e] hover:shadow-[2px_2px_0px_#92400e] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                  onClick={() => navigate(`/jobs/${job._id}`)}>

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs uppercase tracking-widest text-amber-600 border border-amber-400 px-2 py-0.5"
                          style={{ fontFamily: 'Georgia, serif' }}>
                          {job?.jobstatus}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-amber-900 mb-1"
                        style={{ fontFamily: 'Georgia, serif' }}>
                        {job?.jobPosition}
                      </h2>
                      <p className="text-amber-700 text-sm font-medium mb-3"
                        style={{ fontFamily: 'Georgia, serif' }}>
                        {job?.company?.companyName}
                      </p>

                      <p className="text-amber-800 text-sm leading-relaxed mb-4 line-clamp-2">
                        {job?.jobDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job?.jobSkills?.map((skill) => (
                          <span key={skill}
                            className="text-xs bg-amber-100 border border-amber-400 text-amber-800 px-2 py-0.5"
                            style={{ fontFamily: 'Georgia, serif' }}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-amber-600">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {job?.joblocation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={12} />
                          {job?.jobExperience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          ${job?.salary}/yr
                        </span>
                      </div>
                    </div>

                    <ChevronRight size={20} className="text-amber-600 shrink-0 ml-4 mt-1" />
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