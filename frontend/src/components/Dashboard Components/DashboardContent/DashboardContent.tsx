import React, { useEffect, useState } from 'react'
import TodoList from '../Todos/TodoList'
import "./dashboardcontent.scss"
import axios from 'axios';
import { useAuthContext } from '../../../context/useAuthContext';
import { useClothesContext } from '../../../context/ClothesContext';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';;

const DashboardContent = () => {
  const { user } = useAuthContext()
  const id = user?.user?.id
  const accesstoken = user ? user.token : null



  return (
    <div className='main'>
      <div className="card-container">
        <TodoList />
      </div>

    </div >
  )
}

export default DashboardContent