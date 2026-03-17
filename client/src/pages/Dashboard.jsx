import { deleteApplicaiton, getMyApplication } from "@/services/applicationService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Trash2, Calendar, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null })
  const navigate = useNavigate();

  useEffect(() => {
    const getApplication = async () => {
      try {
        const res = await getMyApplication();
        setTableData(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false);
      }
    };
    getApplication();
  }, []);

  const handleDelete = async (applicationId) => {
    try {
      await deleteApplicaiton(applicationId);
      setTableData((prev) => prev.filter((val) => val._id !== applicationId));
      toast.success('Application withdrawn')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  };

  const statusColor = (status) => {
    if (status === 'accepted') return 'bg-green-50 text-green-600'
    if (status === 'rejected') return 'bg-red-50 text-red-500'
    return 'bg-yellow-50 text-yellow-600'
  }

  if (loading) return <Spinner />

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Applications</h1>
          <p className="text-gray-500 mt-1 text-sm">Track all your job applications</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
              <Briefcase size={20} className="text-teal-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tableData.length}</p>
              <p className="text-xs text-gray-500 font-medium">Total Applied</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <Briefcase size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tableData.filter(v => v.status === 'accepted').length}</p>
              <p className="text-xs text-gray-500 font-medium">Accepted</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Briefcase size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{tableData.filter(v => v.status === 'pending').length}</p>
              <p className="text-xs text-gray-500 font-medium">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">All Applications</h2>
          </div>

          {tableData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Briefcase size={40} className="text-gray-200 mb-3" />
              <p className="text-gray-400 font-medium">No applications yet</p>
              <p className="text-gray-300 text-sm mt-1">Browse jobs and start applying!</p>
              <button
                onClick={() => navigate('/jobs')}
                className="mt-4 bg-gradient-to-r from-teal-500 to-green-500 text-white text-sm font-semibold px-5 py-2 rounded-xl"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {tableData.map((val) => (
                <div key={val._id} className="px-6 py-5 hover:bg-gray-50 transition flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {val.job?.company?.companyLogo ? (
                      <img src={val.job.company.companyLogo} alt="logo" className="w-10 h-10 rounded-xl object-contain border border-gray-100 flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <Briefcase size={18} className="text-teal-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p
                        className="font-semibold text-gray-900 truncate cursor-pointer hover:text-teal-600 transition flex items-center gap-1"
                        onClick={() => navigate(`/jobs/${val.job._id}`)}
                      >
                        {val.job?.jobPosition} <ExternalLink size={12} />
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">{val.job?.company?.companyName}</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={11} />
                    {new Date(val.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>

                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(val.status)}`}>
                    {val.status}
                  </span>

                  <button
                    onClick={() => setDeleteModal({ open: true, id: val._id })}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition"
                  >
                    <Trash2 size={13} /> Withdraw
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        onConfirm={() => {
          handleDelete(deleteModal.id)
          setDeleteModal({ open: false, id: null })
        }}
        message="Are you sure you want to withdraw this application?"
      />

    </div>
  )
}

export default Dashboard;