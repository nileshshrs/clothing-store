import React from 'react'
import Sidebar from '../components/Dashboard Components/Sidebar'
import { Outlet } from 'react-router-dom'
import "../global css/Dashboard.scss"

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <main className='dashboard-items-container'>
        <div>
          dashboard header here
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard