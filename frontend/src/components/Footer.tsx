import React from 'react'
import { Link } from 'react-router-dom'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-black text-white'>
            <div className='footer-container'>
                <div className='footer-div'>
                    <h3>SHOP</h3>
                    <ul>
                        <li>
                            <Link to="/clothes/men">Shop All Men's</Link>
                        </li>
                        <li>
                            <Link to="/clothes/women">Shop All Women's</Link>
                        </li>
                        <li>
                            <Link to="#">Gift Card</Link>
                        </li>
                        <li>
                            <Link to="/clothes">Store</Link>
                        </li>
                    </ul>
                </div>
                <div className='footer-div'>
                    <h3>#MADETHECUT</h3>
                    <ul>
                        <li>
                            <Link to="#">About Us</Link>
                        </li>
                        <li>
                            <Link to="#">Rewards</Link>
                        </li>
                        <li>
                            <Link to="#">Careers</Link>
                        </li>
                        <li>
                            <Link to="#">Corporate and Wholesale</Link>
                        </li>
                    </ul>
                </div>
                <div className='footer-div'>
                    <h3>CONTACT</h3>
                    <ul>
                        <li>
                            <Link to="#">FAQ</Link>
                        </li>
                        <li>
                            <Link to="#">My Account</Link>
                        </li>
                        <li>
                            <Link to="/user-orders">Track Order</Link>
                        </li>
                        <li>
                            <Link to="#">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="#">Accessibility</Link>
                        </li>
                        <li>

                        </li>

                    </ul>
                </div>
                <div className='footer-div'>
                    <FaXTwitter />
                    <FaInstagram />
                    <FaTiktok />
                    <FaFacebookF />
                    <FaYoutube />
                </div>
            </div>
            <div className='flex gap-5 items-center justify-center py-3 flex-wrap'>
                <div className='text-xs'>
                    © 2024 All Rights Reserved Cuts Clothing
                </div>

                <div className='flex items-center justify-center gap-5 text-xs flex-wrap'>
                    <span>Manage Cookie Settings</span>
                    <span>Privacy Policy</span>
                    <span>Terms of Use</span>
                </div>


            </div>
        </footer>
    )
}

export default Footer