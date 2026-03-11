import { setLogout } from '@/redux/slices/authSlice'
import { logout } from '@/services/authService'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Briefcase, ChevronDown } from 'lucide-react'

function Navbar() {
  const { user, loggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = async () => {
    await logout()
    dispatch(setLogout())
    navigate("/")
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to='/' className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow">
            <Briefcase size={16} className="text-white" />
          </div>
          <span className="text-gray-900 font-bold text-lg tracking-tight">
            Career<span className="text-teal-500">Portal</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link to='/' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
            Home
          </Link>
          <Link to='/jobs' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
            Browse Jobs
          </Link>

          {loggedIn && user?.role === 'seeker' && (
            <>
              <Link to='/dashboard' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
                My Applications
              </Link>
              <Link to='/profile' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
                Profile
              </Link>
            </>
          )}

          {loggedIn && user?.role === 'employer' && (
            <>
              <Link to='/employer/dashboard' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
                Dashboard
              </Link>
              <Link to='/employer/post-job' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
                Post Job
              </Link>
              <Link to='/employer/company' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
                Company
              </Link>
            </>
          )}

          {loggedIn && user?.role === 'admin' && (
            <Link to='/admin/dashboard' className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg font-medium transition">
              Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <div className="flex items-center gap-2">
              {/* User Badge */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 text-sm font-medium">{user?.name}</span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 text-sm px-3 py-2 rounded-lg font-medium transition"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to='/login' className="text-gray-600 hover:text-gray-900 text-sm px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition">
                Sign In
              </Link>
              <Link to='/register' className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md shadow-teal-100 transition-all duration-200">
                Get Started
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar