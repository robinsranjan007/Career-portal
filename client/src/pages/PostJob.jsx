import { createJob } from '@/services/jobService'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function PostJob() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()

  const handleOnSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        jobSkills: data.jobSkills.split(",").map(s => s.trim())
      }
      await createJob(formData)
      navigate('/employer/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Post a Job</h1>
          <p className="text-gray-500 mt-1 text-sm">Fill in the details to find your next great hire</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-teal-100 border border-gray-100 p-8">
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">

            {/* Row 1 — Position + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Job Position</label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  {...register("jobPosition", { required: "Position is required" })}
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
                {errors.jobPosition && <p className="text-red-500 text-xs">{errors.jobPosition.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Toronto, Canada"
                  {...register("joblocation", { required: "Location is required" })}
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
                {errors.joblocation && <p className="text-red-500 text-xs">{errors.joblocation.message}</p>}
              </div>
            </div>

            {/* Row 2 — Salary + Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Salary</label>
                <input
                  type="text"
                  placeholder="e.g. $80,000 - $100,000"
                  {...register("salary", { required: "Salary is required" })}
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
                {errors.salary && <p className="text-red-500 text-xs">{errors.salary.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Experience Required</label>
                <input
                  type="text"
                  placeholder="e.g. 2+ years"
                  {...register("jobExperience", { required: "Experience is required" })}
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                />
                {errors.jobExperience && <p className="text-red-500 text-xs">{errors.jobExperience.message}</p>}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Required Skills</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                {...register("jobSkills", { required: "Skills are required" })}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              />
              {errors.jobSkills && <p className="text-red-500 text-xs">{errors.jobSkills.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Job Description</label>
              <textarea
                rows={5}
                placeholder="Describe the role, responsibilities, and requirements..."
                {...register("jobDescription", { required: "Description is required" })}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-none"
              />
              {errors.jobDescription && <p className="text-red-500 text-xs">{errors.jobDescription.message}</p>}
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Job Status</label>
              <select
                {...register("jobstatus", { required: "Status is required" })}
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
              >
                <option value="">Select status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
              {errors.jobstatus && <p className="text-red-500 text-xs">{errors.jobstatus.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-semibold py-3 rounded-xl text-sm shadow-lg shadow-teal-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Posting...' : 'Post Job →'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default PostJob