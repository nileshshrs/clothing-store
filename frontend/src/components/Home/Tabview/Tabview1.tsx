import React from "react";
import "../../../global css/Tabview.scss";
import { Link } from "react-router-dom";
import { useClothesContext } from "../../../context/ClothesContext";

const Tabview1 = () => {
  const { clothesData, loading } = useClothesContext();

  // Filter clothes where category is 'Male' and new is true
  const filteredClothes = clothesData.filter(
    (clothes) => clothes.category === "Male" && clothes.new === true && clothes.inStock === true
  );

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
              <button className="quick-add">Quick Add</button>
            </div>
            <div className="card-title">
              <span>{clothes.brand}</span>
              <h3>{clothes.name}</h3>
              <p>${clothes.price}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tabview1;
