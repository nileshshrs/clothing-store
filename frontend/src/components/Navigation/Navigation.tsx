import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoBagHandleSharp } from "react-icons/io5";
import "./Navigation.scss"


const Navigation = () => {

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
        console.log(nav)
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
                            <Link to="/">Home</Link>
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
                            <Link to="/contact">Contact</Link>
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
                    <Link to="/cart">
                        <button className='cart-btn flex items-center justify-between gap-1'>cart<IoBagHandleSharp /></button>
                    </Link>
                    <Link to="/sign-in">
                        <button className='login-btn'>sign in</button>
                    </Link>
                    <Link to="/sign-up">
                        <button className='register-btn'>sign up</button>
                    </Link>
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
                            <h1>CUT<span>'S</span></h1>
                        </Link>
                    </div>
                    <nav className='sidebar-nav'>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
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
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link to="/cart">Cart</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='authentication-btn'>

                        <Link to="/sign-in">
                            <button className='login-btn'>sign in</button>
                        </Link>
                        <Link to="/sign-up">
                            <button className='register-btn'>sign up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navigation