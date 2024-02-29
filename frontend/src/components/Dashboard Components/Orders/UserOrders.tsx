import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/useAuthContext';
import "./orders.scss"

const UserOrders = () => {
    const { user } = useAuthContext()
    const id = user?.user?.id
    const accesstoken = user ? user.token : null
    const [orders, setOrders] = useState([]);
    const [statusbtn, setStatusbtn] = useState("Complete");
    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/orders/all", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`
                }
            });
            res.data.sort((a, b) => a.orderId - b.orderId);
            setOrders(res.data);
            // console.log(res.data);
        } catch (error) {
            // console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCompleteClick = async (order) => {
        try {
            const res = await axios.patch(
                `http://localhost:8080/api/v1/orders/update/${order.orderId}`,
                {
                    status: !order.status,
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`
                }
            }
            );

            fetchOrders();

            // console.log(order.status);
            // console.log(order.orderId);
            setStatusbtn(statusbtn === "Complete" ? "Pending" : "Complete");
        } catch (e) {
            // console.error("Error updating", e);
        }
    };

    const handleDeleteClick = async (orderId) => {
        try {
            const res = await axios.delete(
                `http://localhost:8080/api/v1/orders/delete/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`
                }
            }
            );


            fetchOrders(); // Refresh the orders after deletion

        } catch (error) {
            // console.error("Error deleting order:", error);
        }
    };

    return (
        <div className="orders-container">
            <h3 className="">
                Order Detail
            </h3>
            <div className="shadow-lg orders">


                <table className="">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="">Order ID</th>
                            <th className="">Image</th>
                            <th className="">Name</th>
                            <th className="">User</th>
                            <th className="">Email</th>
                            <th className="">Payment</th>
                            <th className="">Address</th>
                            <th className="">Contact</th>
                            <th className="">Quantity</th>
                            <th className="">Total Price</th>
                            <th className="">Status</th>
                            <th className="">Cancel Order</th>
                            <th className="">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => ((
                                <tr key={order.orderId} >
                                    <td className="">
                                        {order.orderId}
                                    </td>
                                    <td className="">
                                        <img
                                            src={order.image}
                                            alt=""
                                            height={"70px"}
                                            width={"45px"}
                                        />
                                    </td>
                                    <td
                                        className=""
                                        style={{ minWidth: `${order.name.length * 8}px` }}
                                    >
                                        {order.name}
                                    </td>
                                    <td className="">
                                        {order.username}
                                    </td>
                                    <td className="">
                                        {order.userEmail}
                                    </td>

                                    <td className="">
                                        {order.paymentMethod}
                                    </td>
                                    <td className="">
                                        {order.shippingAddress}
                                    </td>
                                    <td className="">
                                        {order.contact}
                                    </td>
                                    <td className=" ">
                                        {order.quantity}
                                    </td>
                                    <td className=" ">
                                        $ {order.totalPrice}
                                    </td>
                                    <td className="">
                                        {order.status ? "Completed" : "Pending"}
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            className={`action-button rounded text-white text-[10px] w-[100px] py-2 bg-black font-semibold bg-${order.status ? "green" : "orange"
                                                }`}
                                            onClick={() => handleDeleteClick(order.orderId)}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                    <td>
                                        <button
                                            className={`action-button rounded text-white text-[10px] w-[100px] py-2 bg-black font-semibold bg-${order.status ? "green" : "orange"
                                                }`}
                                            onClick={() => handleCompleteClick(order)}
                                        >
                                            {order.status ? "Completed" : "Complete Order"}
                                        </button>
                                    </td>
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default UserOrders


