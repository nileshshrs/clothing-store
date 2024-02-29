import React from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.scss"
import { AiOutlineClose } from 'react-icons/ai'

const Sidebar = ({ openSidebar, click }) => {
    const sidebarSlide =()=>{
        click()
    }
    return (
        <div className={openSidebar ? "sidebar-container" : "sidebar-container slide-sidebar"}>
            <button className='sidebar-btn' onClick={sidebarSlide}><AiOutlineClose /></button>
            <div className='sidebar-logo'>
                <h3><Link to="/clothes">Shop All</Link></h3>
            </div>
            <div className='link-container'>
                <h5>TOPS</h5>
                <div className='sidebar-links'>
                    <Link to="#">Tees</Link>
                    <Link to="#">Polos</Link>
                    <Link to="#">Long Sleeves</Link>
                    <Link to="#">Sweatshirts & Layers</Link>
                    <Link to="#">Outerwear</Link>
                    <Link to="/clothes">All Tops</Link>
                </div>
            </div>
            <div className='link-container'>
                <h5>BOTTOMS</h5>
                <div className='sidebar-links'>
                    <Link to="#">Shorts</Link>
                    <Link to="#">Pants & Joggers</Link>
                    <Link to="#">Sweatpants</Link>
                    <Link to="#">All Bottoms</Link>
                </div>
            </div>
            <div className='link-container'>
                <div className="sidebar-links">
                    <Link to="/clothes/men">All Men</Link>
                    <Link to="/clothes/women">All Women</Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar