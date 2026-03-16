import { deleteUsers, getAllUsers } from "@/services/authService";
import { deleteJob, getAllJob } from "@/services/jobService";
import React, { useEffect, useState } from "react";
import { Trash2, Users, Briefcase } from "lucide-react";

function AdminDashboard() {
  const [allusers, setAllusers] = useState([]);
  const [alljobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const [userRes, jobRes] = await Promise.all([getAllUsers(), getAllJob()]);
        setAllJobs(jobRes.data);
        setAllusers(userRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getDashboardData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUsers(id);
      setAllusers((prev) => prev.filter((val) => val._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      setAllJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const roleColor = (role) => {
    if (role === 'admin') return 'bg-purple-50 text-purple-600'
    if (role === 'employer') return 'bg-blue-50 text-blue-600'
    return 'bg-teal-50 text-teal-600'
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage all users and job listings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
              <Users size={20} className="text-teal-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{allusers.length}</p>
              <p className="text-xs text-gray-500 font-medium">Total Users</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <Briefcase size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{alljobs.length}</p>
              <p className="text-xs text-gray-500 font-medium">Total Jobs</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">All Users</h2>
              <span className="text-xs font-medium bg-teal-50 text-teal-600 px-3 py-1 rounded-full">
                {allusers.length} total
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {allusers.map((user) => (
                <div key={user._id} className="px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${roleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jobs Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">All Jobs</h2>
              <span className="text-xs font-medium bg-green-50 text-green-600 px-3 py-1 rounded-full">
                {alljobs.length} total
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {alljobs.map((job) => (
                <div key={job._id} className="px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {job?.company?.companyLogo ? (
                      <img src={job.company.companyLogo} alt="logo"
                        className="w-9 h-9 rounded-xl object-contain border border-gray-100 flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <Briefcase size={15} className="text-teal-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{job.jobPosition}</p>
                      <p className="text-xs text-gray-400 truncate">{job.company?.companyName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      job.jobstatus === 'open' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {job.jobstatus}
                    </span>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;