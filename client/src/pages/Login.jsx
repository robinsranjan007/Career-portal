import { setUser } from '@/redux/slices/authSlice'
import { login } from '@/services/authService'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const res = await login(data)
      dispatch(setUser(res.data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-green-500 mb-4 shadow-lg">
            <Briefcase size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Career<span className="text-teal-500">Portal</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back — sign in to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-teal-100 border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                {...register('email', { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                {...register('password', { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-semibold py-3 rounded-xl text-sm shadow-lg shadow-teal-200 transition-all duration-200 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In →'}
            </button>

          </form>

          <div className="flex items-center gap-2 my-5">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-gray-300 text-xs">or</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          <p className="text-center text-gray-500 text-sm">
            New here?{' '}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-300 text-xs mt-6">
          © 2024 CareerPortal · All Rights Reserved
        </p>

      </div>
    </div>
  )
}

export default Login