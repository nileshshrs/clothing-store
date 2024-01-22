import  { useState } from 'react'
import Sidebar from '../components/Dashboard Components/Sidebar'
import { Outlet } from 'react-router-dom'
import "../global css/Dashboard.scss"
import { AiOutlineMenu } from 'react-icons/ai'
import { CgAddR } from "react-icons/cg";
import AddClothes from '../components/Dashboard Components/Add Clothes/AddClothes'

const Dashboard = () => {
  const [slide, setSlide] = useState(false)
  const [openForm, setOpenForm] = useState(false)

  const handleSlide = () => {
    setSlide(!slide)
  }
  const handleOpenForm = () => {
    setOpenForm(!openForm)
  }
  return (
    <div className='dashboard-container'>
      <div className={slide ? "sidebar slide" : "sidebar"}>
        <Sidebar slide={handleSlide} />
      </div>
      <main className='dashboard-items-container pr-5'>
        <div className='mb-5 py-2 pr-2 topbar flex items-center justify-between'>
          <div className='flex gap-3'>
            <button onClick={handleSlide} className='hamburger-btn'>
              <AiOutlineMenu />
            </button>
            <h2>
              Welcome to Dashboard!
            </h2>
          </div>
          <div>
            <button className='flex items-center justify-center gap-2 add-clothes' onClick={handleOpenForm}>
              <CgAddR />Add Clothes
            </button>
          </div>
          <AddClothes open={handleOpenForm} form={openForm}/>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard