import React from "react";
import "../../../../global css/Tabview.scss"
import { Link } from "react-router-dom";
import { useClothesContext } from "../../../../context/ClothesContext";
import { useCartContext } from "../../../../context/CartContext";
import { useAuthContext } from "../../../../context/useAuthContext";
import { addToCart } from "../../../../components/AddToCart.js";


const Tabview1 = () => {
  const { clothesData, loading } = useClothesContext();
  const { fetchCartData } = useCartContext();
  const { user } = useAuthContext()
  const userId = user ? user.user.id : null
  const accesstoken = user ? user.token : null

  // Filter clothes where category is 'Male' and new is true
  const filteredClothes = clothesData.filter(
    (clothes) => clothes.category === "Male" && clothes.new === true && clothes.inStock === true
  );

  const handleQuickAdd = (clothes) => {
    if (clothes.size.length === 1) {

      // Add the logic to handle the case when there's only one size
      addToCart(clothes.id, userId, clothes.color[0], clothes.size[0], accesstoken)
      fetchCartData()
    } else {
    
      addToCart(clothes.id, userId, clothes.color[0], clothes.size[1], accesstoken)
      fetchCartData()
      // Add the logic to handle the case when there are multiple sizes
    }
    fetchCartData()
    // Add the rest of your logic for handling the quick add
    // ...
  };

  return (
    <div className="card-container">
      {!loading &&
        filteredClothes.map((clothes) => (
          <div key={clothes.id} className="clothes-card">
            <div className="card-img">
              <Link to="">
                <img
                  src={clothes.imagePath}
                  alt=""
                  className="max-w-[270px] min-h-[370px]"
                />
              </Link>
              <button className="quick-add" onClick={() => { handleQuickAdd(clothes) }}>Quick Add</button>
            </div>
            <div className="card-title">
              <div className="flex items-center justify-between w-full">
                <span className="w-full">{clothes.type}</span>
                <span className="text-end text-xs w-full">{clothes.color.length <= 1 ? `${clothes.color[0]}` : `${clothes.color[1]}`}</span>
              </div>
              <h3 className="capitalize">{clothes.name}</h3>
              <p>${clothes.price}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tabview1;
