import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children, allowedRoles }) {
  const { user, loggedIn, loading } = useSelector((state) => state.auth)

  if (loading) return <div>Loading...</div>  

  if (!loggedIn) return <Navigate to="/login" />

  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />
  
  return children
}

export default ProtectedRoutes