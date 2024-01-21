import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/useAuthContext';
import { BsGrid1X2, BsArchive, BsPerson } from "react-icons/bs";
import { BiLogOut, BiHome } from "react-icons/bi";
import { useLogout } from '../../context/useLogout';
import { GiClothes } from "react-icons/gi";

const Sidebar = ({ slide }) => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleLogout = () => {
        // Dispatch the "LOGOUT" action to update the user state
        logout();
    };
    return (
        <div className='sidebar-nav'>
            <button className="close-btn" onClick={slide}>
                <AiOutlineClose />
            </button>
            <header>
                <Link to="/">
                    <h2>CUT<span>'S</span></h2>
                </Link>
            </header>
            <div className='account-container'>
                <Link to={"/profile"}>
                    <span className='img-container'>
                        <img src="" alt="N" width={"30px"}
                            height={"30px"} />
                    </span>
                    <span className='username-container'>{user ? user.user.username : "account"}</span>
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <BsGrid1X2 />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <BiHome />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/clothes">
                            <GiClothes /> Clothes
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/users">
                            <BsPerson />
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/orders">
                            <BsArchive />
                            Order
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="logout-container">
                <button className="flex items-center justify-center gap-1" onClick={handleLogout}>
                    <BiLogOut />
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Sidebar