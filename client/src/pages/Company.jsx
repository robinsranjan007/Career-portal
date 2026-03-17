import { createCompany, getMyCompany, updateCompany } from '@/services/companyService'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Spinner from '@/components/Spinner'

function Company() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getMyCompany()
        setCompany(res.data)
        reset({
          companyName: res.data.companyName,
          companyLogo: res.data.companyLogo,
          companyLocation: res.data.companyLocation,
          companyDescription: res.data.companyDescription,
        })
      } catch (_) {
        setCompany(null)
      } finally {
        setLoading(false)
      }
    }
    fetchCompany()
  }, [])

  const handleOnSubmit = async (data) => {
    try {
      if (company) {
        await updateCompany(data, company._id)
        toast.success('Company updated!')
      } else {
        await createCompany(data)
        toast.success('Company created!')
      }
      navigate('/employer/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-green-500 mb-4 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {company ? 'Edit Your Company' : 'Create Your Company'}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {company ? 'Update your company details' : 'Set up your profile and start hiring top talent'}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-teal-100 border border-gray-100 p-8 space-y-5">
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                {...register("companyName", { required: "Company name is required" })}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
              {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Company Logo URL</label>
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                {...register("companyLogo", { required: "Logo URL is required" })}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
              {errors.companyLogo && <p className="text-red-500 text-xs">{errors.companyLogo.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <input
                type="text"
                placeholder="e.g. Toronto, Canada"
                {...register("companyLocation", { required: "Location is required" })}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
              {errors.companyLocation && <p className="text-red-500 text-xs">{errors.companyLocation.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                rows={4}
                placeholder="Tell candidates about your company..."
                {...register("companyDescription", { required: "Description is required" })}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-none"
              />
              {errors.companyDescription && <p className="text-red-500 text-xs">{errors.companyDescription.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-semibold py-3 rounded-xl text-sm shadow-lg shadow-teal-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Saving...' : company ? 'Update Company →' : 'Create Company →'}
            </button>

          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          You can edit your company details anytime from the dashboard
        </p>
      </div>
    </div>
  )
}

export default Company