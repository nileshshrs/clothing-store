import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/useAuthContext';
import { toast } from 'react-toastify';

const Orders = () => {
    const { user } = useAuthContext()
    const id = user?.user?.id
    const accesstoken = user ? user.token : null
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {

                const res = await axios.get(`http://localhost:8080/api/v1/orders/user/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accesstoken}`
                    }
                });


                const userOrders = res.data;


                setOrders(userOrders);
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };
        fetchOrders()
    }, [])

    const handleDeleteOrder = async (orderId) => {
        try {
            // Make an API call to delete the order
            const response = await axios.delete(`http://localhost:8080/api/v2/orders/delete/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`
                }
            });

            // Handle successful order deletion
            toast.success(response.data);

            // Refresh order list
            const updatedOrders = orders.filter((order) => order.orderId !== orderId);
            setOrders(updatedOrders);
        } catch (error) {
            // Handle order deletion error
            toast.error("Error deleting order");
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div className="w-[95%] container  mt-8 mb-8 sm:w-full lg:w-2/3 xl:w-3/4 mx-auto">
            <h3 className="font-bold text-gray-900 text-3xl mb-6">Your Orders</h3>
            <div className="max-w-4xl mx-auto  shadow-lg overflow-x-auto" style={{ maxWidth: "1200px" }}>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 whitespace-nowrap text-center">Order ID</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">User</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">Number</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">Address</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">Book</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">Qnt</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">Price</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">Status</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.orderId}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.username}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.contact}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.shippingAddress}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.bookTitle}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.quantity}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">${order.totalPrice}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.status ? "Completed" : "Pending"}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">
                                    <button className="action-button rounded 
                text-white bg-black p-1"  onClick={() => handleDeleteOrder(order.orderId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>



    )
}

export default Orders