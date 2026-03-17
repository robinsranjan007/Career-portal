import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteApplicaiton, getJobApplication, updateApplication } from '@/services/applicationService'
import { Trash2, Users, Mail, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import Spinner from '@/components/Spinner'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

function Applicants() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [data, setFormdata] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null })

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await getJobApplication(jobId)
        setFormdata(res.data)
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    getApplications()
  }, [jobId])

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await updateApplication({ status: newStatus }, applicationId)
      setFormdata(prev => prev.map(app =>
        app._id === applicationId ? { ...app, status: newStatus } : app
      ))
      toast.success('Status updated')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  const handleDelete = async (applicationId) => {
    try {
      await deleteApplicaiton(applicationId)
      setFormdata(prev => prev.filter(app => app._id !== applicationId))
      toast.success('Applicant removed')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Applicants</h1>
          <p className="text-gray-500 mt-1 text-sm">Review and manage candidates for this position</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">All Applicants</h2>
            <span className="text-xs font-medium bg-teal-50 text-teal-600 px-3 py-1 rounded-full">
              {data.length} total
            </span>
          </div>

          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users size={40} className="text-gray-200 mb-3" />
              <p className="text-gray-400 font-medium">No applicants yet</p>
              <p className="text-gray-300 text-sm mt-1">Share your job posting to attract candidates</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {data.map((app) => (
                <div key={app._id} className="px-6 py-5 hover:bg-gray-50 transition flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {app?.user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{app?.user?.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Mail size={11} /> {app?.user?.email}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar size={11} /> {new Date(app?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(app?.status)}`}>
                    {app?.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/profile/${app?.user?._id}`)}
                      className="text-xs font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-xl transition"
                    >
                      View Profile
                    </button>

                    <select
                      value={app.status}
                      onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                      className="text-xs border border-gray-200 bg-gray-50 text-gray-700 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400 transition"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => setDeleteModal({ open: true, id: app._id })}
                      className="flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>

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
        message="This applicant will be permanently removed."
      />

    </div>
  )
}

export default Applicants