import React from 'react'
import TodoList from '../Todos/TodoList'
import "./dashboardcontent.scss"

const DashboardContent = () => {
  return (
    <div className='main'>
      <TodoList />
    </div>
  )
}

export default DashboardContent