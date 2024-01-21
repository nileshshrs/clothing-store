import React, { useState } from 'react'
import Sidebar from '../components/Dashboard Components/Sidebar'
import { Outlet } from 'react-router-dom'
import "../global css/Dashboard.scss"
import { AiOutlineMenu } from 'react-icons/ai'

const Dashboard = () => {
  const [slide, setSlide] = useState(false)

  const handleSlide = () => {
    setSlide(!slide)
  }
  return (
    <div className='dashboard-container'>
      <div className={slide ? "sidebar slide" : "sidebar"}>
        <Sidebar slide={handleSlide} />
      </div>
      <main className='dashboard-items-container pr-5'>
        <div className='mb-5 py-2 pr-2 topbar'>
          <div className='flex gap-3'>
            <button onClick={handleSlide}>
              <AiOutlineMenu />
            </button>
            <h2>
              Welcome to Dashboard!
            </h2>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard