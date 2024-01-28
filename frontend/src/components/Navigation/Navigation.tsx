import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Navigation.scss"
import { useAuthContext } from '../../context/useAuthContext';
import { useLogout } from '../../context/useLogout';



const Navigation = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [nav, setNav] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        // Dispatch the "LOGOUT" action to update the user state
        logout();
    };

    const handleOptionClick = (value) => {
        // Handle the click event for each option
        setIsOpen(false);
    };

    const handleNav = () => {
        setNav(!nav);

    };
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderFixed(scrollPosition > 60);
        };

        // Attach the event listener when the component mounts
        window.addEventListener("scroll", handleScroll);

        // Detach the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header className={`${isHeaderFixed ? "fixed-header" : ""}`}>
            <div className='navbar-container'>
                <div className='logo'>
                    <Link to="/">
                        <h1>CUT<span>'S</span></h1>
                    </Link>
                </div>
                <nav className='navbar'>
                    <ul>
                        <li>
                            {
                                user && user.user.roles === "admin" ? <Link to="/dashboard">Dashboard</Link> : <Link to="/">Home</Link>
                            }
                        </li>
                        <li>
                            <Link to="/clothes">Clothes</Link>
                        </li>
                        <li>
                            <Link to="/clothes/men">Men's</Link>
                        </li>
                        <li>
                            <Link to="/clothes/women">Women's</Link>
                        </li>
                        <li className="">
                            <form className="">
                                <input type="text" placeholder="search..." />
                                <button>
                                    <FaSearch />
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>
                <div className='auth-btn'>
                    {
                        user ?
                            <>
                                <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
                                    <div className="dropdown-toggle" onClick={toggleDropdown}>
                                        <span><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" height={"25px"} width={"25px"} className='border border-white rounded-full' /></span>
                                        <span className='flex items-center justify-center w-full gap-2'>{user.user.username}<IoMdArrowDropdown /></span>
                                    </div>
                                    {isOpen && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-option" onClick={() => handleOptionClick('Option 1')}>
                                                <Link to="/account"> <button className='cart-btn flex items-center justify-center w-full p-1 gap-1'>Account<FaUser /></button> </Link>
                                            </div>
                                            <div className="dropdown-option" onClick={() => handleOptionClick('Option 1')}>
                                                <Link to="/cart"> <button className='cart-btn flex items-center justify-center w-full p-1 gap-1'>Cart<IoBagHandleSharp /></button> </Link>
                                            </div>
                                            <div className="dropdown-option" onClick={() => handleOptionClick('Option 1')}>
                                                <button onClick={handleLogout} className='cart-btn flex items-center justify-center w-full p-1 gap-1'>Logout <MdLogout /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </>
                            :
                            <>
                                <Link to="/sign-in">
                                    <button className='login-btn'>sign in</button>
                                </Link>
                                <Link to="/sign-up">
                                    <button className='register-btn'>sign up</button>
                                </Link>
                            </>
                    }
                </div>
                <button className='text-black hamburger-menu' onClick={handleNav}>
                    <AiOutlineMenu />
                </button>
                <div className={nav ? 'sidebar' : 'sidebar slide'}>
                    <button className='text-black close-menu' onClick={handleNav}>
                        <AiOutlineClose />
                    </button>
                    <div className='logo'>
                        <Link to="/">
                            <h2>CUT<span>'S</span></h2>
                        </Link>
                    </div>
                    <nav className='sidebar-nav'>
                        <ul>
                            <li>
                                {
                                    user && user.user.roles === "admin" ? <Link to="/dashboard">Dashboard</Link> : <Link to="/">Home</Link>
                                }
                            </li>
                            <li>
                                <Link to="/clothes">Clothes</Link>
                            </li>
                            <li>
                                <Link to="/clothes/men">Men's</Link>
                            </li>
                            <li>
                                <Link to="/clothes/women">Women's</Link>
                            </li>
                            <li>
                                {
                                    user ? <Link to="/cart">Cart</Link> : null
                                }
                            </li>
                        </ul>
                    </nav>
                    <div className='authentication-btn'>
                        {user ? <><Link to="/account">
                            <button className='login-btn'>Account</button>
                        </Link>
                            <Link to="">
                                <button className='register-btn' onClick={handleLogout}>Log out</button>
                            </Link></> : <>
                            <Link to="/sign-in">
                                <button className='login-btn'>sign in</button>
                            </Link>
                            <Link to="/sign-up">
                                <button className='register-btn'>sign up</button>
                            </Link></>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navigation