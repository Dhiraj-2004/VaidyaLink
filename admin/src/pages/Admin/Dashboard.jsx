import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { backendUrl } = useContext(AdminContext)
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchDashboardStats = async () => {
    try {
      const { data } = await axios.get(backendUrl + 'api/admin/dashboard')
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Doctors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalDoctors}</p>
            </div>
            <img src={assets.doctor_icon} alt="" className="w-12 h-12" />
          </div>
        </div>

        {/* Total Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalAppointments}</p>
            </div>
            <img src={assets.appointments_icon} alt="" className="w-12 h-12" />
          </div>
        </div>

        {/* Pending Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
            </div>
            <img src={assets.appointment_icon} alt="" className="w-12 h-12" />
          </div>
        </div>

        {/* Confirmed Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-green-600">{stats.confirmedAppointments}</p>
            </div>
            <img src={assets.tick_icon} alt="" className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* Recent Activity or Charts can be added here */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-600">
          Welcome to the admin dashboard. Manage doctors, appointments, and monitor system activity from here.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
