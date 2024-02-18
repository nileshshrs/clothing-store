import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "./Users.scss"

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/users/all");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Error fetching user details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            // Make an API call to delete the user
            const response = await axios.delete(`http://localhost:8080/api/v1/users/delete/${userId}`);

            // Handle successful deletion
            toast.success(response.data);

            // Refresh user table
            fetchData();
        } catch (error) {
            // Handle deletion error
            toast.error("Error deleting user");
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="user-details">
            <div className="users">
                <h3 className="">
                    User Details
                </h3>

                <div className="table-container">
                    <table className=''>
                        <thead>
                            <tr className="bg-gray-200">
                                <th>ID</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.sort((a, b) => a.id - b.id).map((user) => (
                                <tr key={user.id}>
                                    <td >{user.id}</td>
                                    <td >{user.username}</td>
                                    <td >{user.name}</td>
                                    <td >{user.email}</td>
                                    <td >{user.roles}</td>
                                    <td >

                                        <button
                                            className=""
                                            onClick={() => handleDeleteUser(user.id)}
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
        </div>


    )
}

export default Users