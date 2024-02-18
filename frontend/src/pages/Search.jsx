import React, { useEffect, useState } from "react";
import { useClothesContext } from "../context/ClothesContext";
import { Link, useParams } from "react-router-dom";
import "../global css/search.scss";
import { addToCart } from "../components/AddToCart";
import { useAuthContext } from "../context/useAuthContext";
import { useCartContext } from '../context/CartContext';


const Search = () => {
  const { clothesData, loading } = useClothesContext();
  const { searchKey } = useParams();
  const [filteredClothes, setFilteredClothes] = useState([]);

  const { user } = useAuthContext();
  const userId = user ? user.user.id : null;
  const accesstoken = user ? user.token : null;
  const {fetchCartData}   = useCartContext()

  useEffect(() => {
    // Filter clothesData based on searchKey
    const resultData = clothesData.filter((clothes) => {
      const name = clothes.name.toLowerCase();
      const searchArray = searchKey.toLowerCase().split("");
      const reg = new RegExp("(?=.*" + searchArray.join(")(?=.*") + ")", "i");

      return reg.test(name);
    });

    // Set the filtered clothes to state
    setFilteredClothes(resultData);
  }, [searchKey, clothesData]);

  const handleQuickAdd = (clothes) => {
    if (clothes.size.length === 1) {
      // Add the logic to handle the case when there's only one size
      addToCart(
        clothes.id,
        userId,
        clothes.color[0],
        clothes.size[0],
        accesstoken
      );

    } else {
      console.log(`Adding size: ${clothes.size[1]}`);
      addToCart(
        clothes.id,
        userId,
        clothes.color[0],
        clothes.size[1],
        accesstoken
      );

      // Add the logic to handle the case when there are multiple sizes
    }
    fetchCartData();
    // Add the rest of your logic for handling the quick add
    // ...
  };

  return (
    <div className="clothes-wrapper">
      <div className="clothes-container w-full">
        {loading ? (
          <p className="text-center text-xl font-bold">Loading...</p>
        ) : filteredClothes.length === 0 ? (
          <p className="text-center text-xl font-bold">No results found</p>
        ) : (
          filteredClothes.map((clothes) => (
            <div key={clothes.id} className="clothes-card">
              <div className="card-img">
                <Link to={`/clothes/${clothes.id}`}>
                  <img
                    src={clothes.imagePath}
                    alt=""
                    className="max-w-[270px] min-h-[370px]"
                  />
                </Link>
                <button
                  className="add-cart"
                  onClick={() => {
                    handleQuickAdd(clothes);
                  }}
                >
                  + Quick Add
                </button>
              </div>
              <div className="card-title">
                <span>
                  Color: {clothes.color[0]}
                  {clothes.color.length <= 1
                    ? null
                    : `,${clothes.color.length - 1} more colors available`}
                </span>
                <span>
                  Size:{" "}
                  {clothes.size.length === 1
                    ? clothes.size[0]
                    : clothes.size[1]}
                  {clothes.size.length <= 1
                    ? null
                    : `, +${clothes.size.length - 1} more sizes available`}
                </span>
                <h3 className="capitalize">{clothes.name}</h3>
                <p>Price: ${clothes.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
