import Banner from "../components/Home/Banner/Banner";
import NewReleases from "../components/Home/New Releases/NewReleases";
import "../App.scss";
import { Link } from "react-router-dom";
import img1 from "../assets/HPBlock_ShopAllMens_3x4_01_450x_crop_center@2x.progressive.webp";
import img2 from "../assets/NYC-DAY-ONE-MENS--2-139_e1da42ff-684b-4dd6-a323-989d37ea83a1_450x_crop_center@2x.progressive.webp";
import img3 from "../assets/HPBlock_ShopAll_Womens_3x4_02_450x_crop_center@2x.progressive.webp";
import img4 from "../assets/NYC-DAY--2--3--101_450x_crop_center@2x.progressive.webp"
import BestSellers from "../components/Home/Best Sellers/BestSellers";
import img5 from "../assets/BottomBlock_ShopMens_1x1_01_20_281_29_768x_crop_center@2x.progressive.webp"
import img6 from "../assets/BottomBlock_ShopWomens_1x1_01_768x_crop_center@2x.progressive.webp"
import img7 from "../assets/7_350x_crop_center@2x.progressive.webp"
import img8 from "../assets/8_7b160054-f133-4a69-9e19-512719ee71e4_350x_crop_center@2x.progressive.webp"
import img9 from "../assets/6_350x_crop_center@2x.progressive.webp"
import img10 from "../assets/3_c620fb5b-34c0-4ad9-b520-2d83afd87570_350x_crop_center@2x.progressive.webp"
import img11 from "../assets/4_350x_crop_center@2x.progressive.webp"
import img12 from "../assets/5_350x_crop_center@2x.progressive.webp"
import img13 from "../assets/1_590673ed-c289-4859-864b-a7a0dbeb2025_350x_crop_center@2x.progressive.webp"
import img14 from "../assets/2_564b4029-571e-4db6-9ad8-9be9c8cb0188_350x_crop_center@2x.progressive.webp"
import img15 from "../assets/logo-uncrate.svg"
import img16 from "../assets/logo-wired.svg"
import { FaInstagram } from "react-icons/fa";
import Quotes from "../components/Home/Quotes";


const Home = () => {
  return (
    <>
      <Banner />
      <NewReleases />
      {/*static section*/}


      {/*static section*/}
      <section className="clothing-section">
        <div className="cards-container">
          <div className="cards">
            <Link to="">
              <img src={img1} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="/clothes/men">Men's Top</Link>
          </h3>
        </div>
        <div className="cards-container">
          <div className="cards">
            <Link to="">
              <img src={img2} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="/clothes/men">Men's Bottom</Link>
          </h3>
        </div>
        <div className="cards-container">
          <div className="cards">
            <Link to="">
              <img src={img3} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="/clothes/women">Women's Top</Link>
          </h3>
        </div>
        <div className="cards-container">
          <div className="cards">
            <Link to="/clothes/women">
              <img src={img4} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="/clothes/women">Women's Bottom</Link>
          </h3>
        </div>
      </section>

      {/*static section*/}


      {/*static section*/}
      <BestSellers />
      {/*static section*/}


      {/*static section*/}
      <div className="our-story">
        <h4>Our Story</h4>
        <h2>
          We're Inspired by the Cities that Never Sleep and the Dreams that Keep
          Us Awake.
        </h2>
        {/*static section*/}


        {/*static section*/}



      </div>
      <section className="wrapper">
        <div className="img-wrapper">
          <img src={img5} alt="" />
          <div className="wrapper-items">
            <h3>Shop Men's</h3>
            <div className="btn-wrapper">
              <button>New Releases</button>
              <button>Best Sellers</button>
            </div>
          </div>
        </div>
        <div className="img-wrapper">
          <img src={img6} alt="" />
          <div className="wrapper-items">
            <h3>Shop Women's</h3>
            <div className="btn-wrapper">
              <button>New Releases</button>
              <button>Best Sellers</button>
            </div>
          </div>
        </div>
        {/*static section*/}


        {/*static section*/}
      </section>

      <section className="px-0 teams-wrapper flex flex-col justify-center items-center py-[2rem] gap-5 sm:px-3">
        <h3 className="font-bold font-sans text-xl">#CutsTeam</h3>
        <div className="img-wrapper">
          <div className="img-container flex justify-center items-center">
            <Link to="">
              <div className="relative">
                <img src={img7} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="relative">
                <img src={img8} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="relative">
                <img src={img9} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="relative">
                <img src={img10} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
          </div>
          <div className="img-container flex  justify-center items-center">
            <Link to="">
              <div className="relative">
                <img src={img11} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="relative">
                <img src={img12} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="relative">
                <img src={img13} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="relative">
                <img src={img14} alt="" />
                <div className="absolute bg-white top-0 left-0 h-full w-full opacity-0 flex items-center justify-center hover:opacity-[.5] transition ease-linear text-3xl">
                  <FaInstagram />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-5 px-5 py-[5rem] bg-slate-100">
        <div className="w-50% mx-auto flex justify-center items-center flex-col gap-[3rem]">
          <div>
            <Quotes />
          </div>
          <div className="flex items-center justify-center w-full gap-2">
            <img src={img15} alt="" />
            <img src={img16} alt="" />
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
