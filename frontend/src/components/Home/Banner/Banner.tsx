import React from "react";
import "./Banner.scss";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="banner-section ">
      <div className="banner-img-container">
        <img
          src="https://cdn.shopify.com/s/files/1/1368/3463/files/HPHero_3x1_January_2024_20copy_1024x_crop_center@2x.progressive.jpg?v=1704244561"
          alt=""
          className="lg-md-screen-img object-fit-cover min-h-[520px] max-w-[100%]"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1368/3463/files/MOBILE-HP-HERO-1.2.24_768x_crop_center@2x.progressive.jpg?v=1704250478"
          alt=""
          className="md-sm-screen-img object-fit-cover h-[600px] min-w-[100%]"
        />
      </div>
      <div className="heading-container flex flex-col gap-3">
        <h2>Refresh Your Wardrobe</h2>
        <h3>Refined Style. Versatile Comfort</h3>
        <div className="flex justify-content-between items-center">
          <Link to="/">
            <button className="px-[13px] py-[12px]">Shop Women's</button>
          </Link>
          <Link to="/">
            <button className="p-[13px]">Shop Men's</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
