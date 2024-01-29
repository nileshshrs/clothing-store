import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClothesContext } from '../context/ClothesContext';
import Sidebar from '../components/Clothes/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai';
import '../global css/clothes.scss';
import axios from 'axios';

const Clothes = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');


    const onClickSidebarBtn = () => {
        setOpenSidebar(!openSidebar);
    };

    const { clothesData, loading } = useClothesContext();

    // Filter clothes based on the selected category
    const filteredClothes = clothesData.filter(clothes => {
        if (selectedCategory === 'All') {
            return true; // Show all clothes
        } else {
            return clothes.category === selectedCategory || clothes.type === selectedCategory;
        }
    });



    return (
        <div className='clothes'>
            <Sidebar openSidebar={openSidebar} click={onClickSidebarBtn} />
            <div className='clothes-wrapper'>
                <div className='w-full filter-container gap-5 items-center'>
                    <button className={`${selectedCategory === 'All' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('All')}>All
                    </button>

                    <button className={`${selectedCategory === 'Male' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('Male')}>Men
                    </button>

                    <button className={`${selectedCategory === 'Female' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('Female')}>Women
                    </button>

                    <button className={`${selectedCategory === 'T-Shirt' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('T-Shirt')}>Tees
                    </button>

                    <button className={`${selectedCategory === 'Polos' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('Polos')}>Polos
                    </button>

                    <button className={`${selectedCategory === 'Outer' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('Outer')}>Outers
                    </button>

                    <button className={`${selectedCategory === 'Pants & Joggers' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('Pants & Joggers')}>Pants & Joggers
                    </button>

                    <button className={`${selectedCategory === 'Sweatpants' ? 'bg-black text-white' : 'bg-white text-black'
                        } px-3 py-1 rounded-[3px] border border-black`}
                        onClick={() => setSelectedCategory('Sweatpants')}>Sweatpants
                    </button>

                </div>
                <div className='clothes-container w-full'>
                    <button
                        className={openSidebar ? 'sidebar-btn' : 'sidebar-btn invisible'}
                        onClick={onClickSidebarBtn}
                    >
                        <AiOutlineMenu />
                    </button>
                    {loading ? (
                        <p className='text-center text-xl font-bold'>Loading...</p>
                    ) : filteredClothes.length === 0 ? (
                        <p className='text-center text-xl font-bold'>No results found</p>
                    ) : (
                        filteredClothes.map(clothes => (
                            <div key={clothes.id} className='clothes-card'>
                                <div className='card-img'>
                                    <Link to=''>
                                        <img
                                            src={clothes.imagePath}
                                            alt=''
                                            className='max-w-[270px] min-h-[370px]'
                                        />
                                    </Link>
                                    <button className='add-cart'>+ Quick Add</button>
                                </div>
                                <div className='card-title'>
                                    <span>Color: {clothes.color[0]}{clothes.color.length <= 1 ? null : `,${clothes.color.length - 1} more colors available`}</span>
                                    <span>Size: {clothes.size.length === 1 ? "S" : clothes.size[1]}{clothes.size.length <= 1 ? null : `, +${clothes.size.length - 1} more sizes available`}</span>
                                    <h3 className='capitalize'>{clothes.name}</h3>
                                    <p>Price: ${clothes.price}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Clothes;
