import React from 'react'
import { useClothesContext } from '../../../context/ClothesContext';
import { Link } from 'react-router-dom';
import "./dashboardclothes.scss"


const DashboardClothes = () => {

    const { clothesQuery } = useClothesContext();
    const { data: clothesData, isLoading, isSuccess, isError } = clothesQuery
   

    return (
        <div>
            <div className="card-container">
                {
                    clothesData.map(clothes => {
                        return (
                            <>
                                <div className="clothes-card">
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
                                        <button className="edit-btn">Edit</button>
                                        <button className="del-btn">Delete</button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DashboardClothes