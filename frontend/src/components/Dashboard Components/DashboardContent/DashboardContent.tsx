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
  const { clothesData, loading } = useClothesContext();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [totalCarts, setTotalCarts] = useState(0);




  useEffect(() => {
    // Define the headers you want to include
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accesstoken}`, // Add your access token here
    };

    // Fetch user data
    axios.get('http://localhost:8080/api/v1/users/all', { headers })
      .then(response => {
        setTotalUsers(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });

    // Fetch order data
    axios.get('http://localhost:8080/api/v1/orders/all', { headers })
      .then(response => {
        setTotalOrders(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching order count:', error);
      });


    // Fetch cart count
    axios.get('http://localhost:8080/api/v1/carts/get-all', { headers })
      .then(response => {
        setTotalCarts(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching cart count:', error);
      });
  }, []);





  const chartData = [
    { name: 'Users', count: totalUsers },
    { name: 'Orders', count: totalOrders },
    { name: 'Clothes', count: clothesData.length },
    { name: 'Carts', count: totalCarts },
  ];


  return (
    <div className='main'>
      <div className="card-container">
        <TodoList />
        <div className="todolist ">
          <div className='flex flex-col w-full justify-center items-center h-full'>
            <h2 className="cards">
              Total Users
            </h2>
            <h1 className="">
              {totalUsers}
            </h1>
          </div>
        </div>

        <div className="todolist ">
          <div className='flex flex-col w-full justify-center items-center h-full'>
            <h2 className="cards">
              Total Orders
            </h2>
            <h1 className="">
              {totalOrders}
            </h1>
          </div>
        </div>

        <div className="todolist ">
          <div className='flex flex-col w-full justify-center items-center h-full'>
            <h2 className="cards">
              Total Clothes
            </h2>
            <h1 className="">
              {clothesData.length}
            </h1>
          </div>
        </div>

        <div className="todolist ">
          <div className='flex flex-col w-full justify-center items-center h-full'>
            <h2 className="cards">
              Total Carts
            </h2>
            <h1 className="">
              {totalCarts}
            </h1>
          </div>
        </div>
      </div>
      <div className="charts">
        {/* barchart */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* line chart section */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div >
  )
}

export default DashboardContent