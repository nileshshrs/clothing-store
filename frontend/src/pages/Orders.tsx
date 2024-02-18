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
        console.log(orderId)
        try {
            // Make an API call to delete the order
            const response = await axios.delete(`http://localhost:8080/api/v1/orders/delete/${orderId}`, {
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
            <div className="max-w-4xl mx-auto  shadow-lg overflow-x-auto" style={{ maxWidth: "1400px" }}>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Order ID</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Image</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">User</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Number</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Address</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Book</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Qnt</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Price</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Status</th>
                            <th className="py-2 px-4 whitespace-nowrap text-center text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td className="py-2 px-4 whitespace-nowrap text-center">{order.orderId}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center"> <img
                                    src={order.image}
                                    alt=""
                                    height={"70px"}
                                    width={"45px"}
                                /></td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">{order.username}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">{order.contact}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">{order.shippingAddress}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">{order.name}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">{order.quantity}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">${order.totalPrice}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">{order.status ? "Completed" : "Pending"}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-center text-sm font-semibold">
                                    <button className="action-button rounded-sm px-3 text-sm py-2 
                text-white bg-black"  onClick={() => handleDeleteOrder(order.orderId)}
                                    >
                                        Cancel
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