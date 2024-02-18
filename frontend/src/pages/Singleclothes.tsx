import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useClothesContext } from '../context/ClothesContext';
import Sidebar from '../components/Clothes/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai';
import '../global css/singleclothes.scss';
import { addToCart } from "../components/AddToCart";

import { useAuthContext } from '../context/useAuthContext';
import { ToastContainer } from 'react-toastify';
import { useCartContext } from '../context/CartContext';

const Singleclothes = () => {
    const { user } = useAuthContext();
    const { getSingleClothes, singleClothes, loading } = useClothesContext();
    const { fetchCartData } = useCartContext()

    const userId = user ? user.user?.id : null
    const accesstoken =user ?user.token: null

    const [openSidebar, setOpenSidebar] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const onClickSidebarBtn = () => {
        setOpenSidebar(!openSidebar);
    };

    const { id } = useParams();
    useEffect(() => {
        getSingleClothes(id);
    }, [id]);

    useEffect(() => {
        // Set the default selected color and size to the first ones
        if (singleClothes && singleClothes.color && singleClothes.color.length > 0 && singleClothes.size && singleClothes.size.length > 0) {
            setSelectedColor(singleClothes.color[0]);
            setSelectedSize(singleClothes.size[0]);
        }
    }, [singleClothes]);

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const AddtoCart=(id) => {
        addToCart(id, userId, selectedColor, selectedSize, accesstoken)
        fetchCartData();
    }

    return (
        <div className='single-clothes'>
            <Sidebar openSidebar={openSidebar} click={onClickSidebarBtn} />
            <div className='single-clothes-wrapper'>
                <button className={openSidebar ? 'sidebar-btn bg-black text-white p-3' : 'sidebar-btn invisible bg-black text-white p-3'} onClick={onClickSidebarBtn}>
                    <AiOutlineMenu />
                </button>
                {loading ? (
                    <p className='text-center text-xl font-bold'>Loading...</p>
                ) : (
                    <div className='single-clothes-container'>
                        <div className='image-wrapper'>
                            <img src={singleClothes?.imagePath} alt='' />
                        </div>
                        <div className='details'>
                            <div className='title-wrapper border-b py-2 px-3 border-b-slate-200'>
                                <h3 className='capitalize'>{singleClothes?.name}</h3>
                                <div>${singleClothes?.price}</div>
                            </div>
                            <div className='color-wrapper border-b py-2 px-3 border-b-slate-200'>
                                <h5 className='flex justify-between items-center w-full'>Staple Colors: <span>{selectedColor}</span></h5>
                                <div className='color'>
                                    {singleClothes && singleClothes?.color
                                        ? singleClothes.color.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleColorClick(color)}
                                                className={`px-3 py-1 rounded focus:outline-none font-sans text-xs font-semibold ${selectedColor === color
                                                    ? 'bg-black text-white'
                                                    : 'border border-black bg-white text-black'
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))
                                        : null}
                                </div>
                            </div>
                            <div className='size-wrapper border-b py-2 px-3 border-b-slate-200'>
                                <h5 className='flex justify-between items-center w-full'>AVAILABLE SIZES: <span>{selectedSize}</span></h5>
                                <div className='size'>
                                    {singleClothes && singleClothes?.size
                                        ? singleClothes.size.map((size, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSizeClick(size)}
                                                className={`w-[35px] h-[35px] rounded focus:outline-none font-sans text-xs font-semibold ${selectedSize === size
                                                    ? 'bg-black text-white'
                                                    : 'border border-black bg-white text-black'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))
                                        : null}
                                </div>
                            </div>
                            <div className='flex w-full items-center justify-center btn-wrapper border-b py-2 px-3 border-b-slate-200'>
                                <button className='bg-black w-full px-2 py-1 text-white' onClick={() => AddtoCart(id)}>
                                    Add to Cart
                                </button>
                            </div>
                            <div className='w-full border-b py-2 px-3 border-b-slate-200 description-wrapper flex flex-col gap-3'>
                                <h5>Description</h5>
                                <div>
                                    {singleClothes?.description}
                                </div>
                            </div>
                            <div className='w-full border-b py-2 px-3 border-b-slate-200 description-wrapper flex flex-col gap-3'>
                                <h5>MATERIALS & CARE</h5>
                                <ul className='list-disc px-3'>
                                    <li className='text-[9px] font-sans'>Machine wash cold with like colors</li>
                                    <li className='text-[9px] font-sans'>Gentle Cycle</li>
                                    <li className='text-[9px] font-sans'>Tumble dry low</li>
                                    <li className='text-[9px] font-sans'>Low Iron</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Singleclothes;
