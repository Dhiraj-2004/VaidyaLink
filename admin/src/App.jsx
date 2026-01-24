import React, { useContext, useEffect } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken && window.location.pathname === '/') {
      navigate('/admin-dashboard')
    }
  }, [aToken, navigate])

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className='flex-1 p-5'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointment' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorsList />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
