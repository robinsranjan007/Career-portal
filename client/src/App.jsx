 
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import JobDetails from './pages/JobDetails'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import EmployerDashboard from './pages/EmployerDashboard'
import EditJob from './pages/EditJob'
import PostJob from './pages/PostJob'
import Applicants from './pages/Applicants'
import Company from './pages/Company'
import AdminDashboard from './pages/AdminDashboard'
import Jobs from './pages/Jobs'
import ProtectedRoutes from './components/ProtectedRoutes'
import { fetchMe } from './redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

 
 function App() {
const dispatch= useDispatch()

  useEffect(() => {
  dispatch(fetchMe())
}, [])
   return (
    
<Layout>
      <Routes>
        
        <Route  path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}  />
        <Route path="/register" element={<Register/>}  />

        {/* public pages */}
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/jobs/:jobsId' element={<JobDetails/>} />
        {/* seeker */}
        <Route path='/dashboard' element={ <ProtectedRoutes allowedRoles={['seeker']}><Dashboard/></ProtectedRoutes>   } />
        <Route path='/profile' element={<ProtectedRoutes allowedRoles={['seeker']}><Profile/></ProtectedRoutes>} />
        
        {/*employer  */}

        <Route path='/employer/dashboard' element={<ProtectedRoutes allowedRoles={['employer']}><EmployerDashboard/></ProtectedRoutes>} />
        <Route path='/employer/post-job' element={<ProtectedRoutes  allowedRoles={['employer']}><PostJob/></ProtectedRoutes>} />
        <Route path='/employer/edit-job/:jobId' element={<ProtectedRoutes  allowedRoles={['employer']}><EditJob/></ProtectedRoutes>} />
        <Route path='/employer/applicants/:jobId' element={<ProtectedRoutes  allowedRoles={['employer']}><Applicants/></ProtectedRoutes>} />
        <Route path='/employer/company' element={<ProtectedRoutes  allowedRoles={['employer']}><Company/></ProtectedRoutes>} />
        {/* admin */}
        <Route path='/admin/dashboard' element={<ProtectedRoutes  allowedRoles={['admin']}><AdminDashboard/></ProtectedRoutes>} />


        
      </Routes>
</Layout>
  
   )
 }
 
 export default App