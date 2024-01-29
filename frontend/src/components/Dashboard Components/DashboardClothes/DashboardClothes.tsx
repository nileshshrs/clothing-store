import React from 'react'
import { useClothesContext } from '../../../context/ClothesContext';
import { Link } from 'react-router-dom';
import "./dashboardclothes.scss"
import EditClothes from '../Add Clothes/EditClothes';
import axios from 'axios';


const DashboardClothes = () => {


    const { clothesData, handleEditSlide, loading, getSingleClothes, getClothes, deleteClothes } = useClothesContext();

    const update = (id) => {
        handleEditSlide()
        getSingleClothes(id)
    }

    const updateBooleanValue = async (id, field) => {
        try {
            // Make a PATCH request to the API to update the boolean field
            const response = await axios.patch(`http://localhost:8080/api/v1/clothing/update/${id}`, {
                [field]: !clothesData.find(clothes => clothes.id === id)[field], // Toggle the boolean value
            });

            // Handle the response, you may want to update your local state or fetch data again
            console.log(response.data); // Log the response, update your state as needed
            getClothes()
        } catch (error) {
            console.error('Error updating boolean value:', error);
        }
    };



    return (
        <div>
            <div className="card-container">
                {
                    !loading && clothesData.map((clothes) => {
                        return (
                            <div key={clothes.id}>
                                <div className="clothes-card" key={clothes.id}>
                                    <div className="card-img">
                                        <Link to="">
                                            <img
                                                src={clothes.imagePath}
                                                alt=""
                                                className="max-w-[270px] min-h-[370px]"
                                                loading='lazy'
                                            />
                                        </Link>

                                    </div>
                                    <div className="card-title">
                                        <span className='capitalize'>{clothes.color[0]}</span>
                                        <h3 className='capitalize'>{clothes.name}</h3>
                                        <p className='capitalize'>$ {clothes.price}</p>
                                        <div className='flex gap-1'>
                                            <button className="edit-btn" onClick={() => { update(clothes.id) }}>Edit</button>
                                            <button className="del-btn" onClick={() => { deleteClothes(clothes.id) }}>Delete</button>
                                        </div>
                                        <div className='w-full flex flex-col gap-2'>
                                            <div className='flex gap-1'>
                                                <button
                                                    className='edit-btn'
                                                    onClick={() => updateBooleanValue(clothes.id, 'new')}
                                                >
                                                    {!clothes.new ? 'Set as New' : 'Remove as New'}
                                                </button>
                                                {/* Button to toggle the 'inStock' boolean field */}
                                                <button
                                                    className='edit-btn'
                                                    onClick={() => updateBooleanValue(clothes.id, 'inStock')}
                                                >
                                                    {clothes.inStock ? 'Remove Stock' : 'Add to Stock'}
                                                </button>
                                            </div>
                                            <button
                                                className='edit-btn'
                                                onClick={() => updateBooleanValue(clothes.id, 'bestseller')}
                                            >
                                                {!clothes.bestseller ? 'Set as Bestselling' : 'Remove as Bestselling'}
                                            </button>
                                            {/* <button
                                                className='edit-btn'
                                                onClick={() => updateBooleanValue(clothes.id, 'popular')}
                                            >
                                                {!clothes.bestseller ? 'Set as Popular' : 'Remove as Popular'}
                                            </button>
                                             */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <EditClothes />
        </div>
    )
}

export default DashboardClothes