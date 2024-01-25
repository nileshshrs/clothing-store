import Banner from "../components/Home/Banner/Banner";
import NewReleases from "../components/Home/New Releases/NewReleases";
import "../App.scss";
import { Link } from "react-router-dom";
import img1 from "../assets/HPBlock_ShopAllMens_3x4_01_450x_crop_center@2x.progressive.webp";
import img2 from "../assets/NYC-DAY-ONE-MENS--2-139_e1da42ff-684b-4dd6-a323-989d37ea83a1_450x_crop_center@2x.progressive.webp";
import img3 from "../assets/HPBlock_ShopAll_Womens_3x4_02_450x_crop_center@2x.progressive.webp";
import img4 from "../assets/NYC-DAY--2--3--101_450x_crop_center@2x.progressive.webp"
const Home = () => {
  return (
    <>
      <Banner />
      <NewReleases />
      <section className="clothing-section">
        <div className="cards-container">
          <div className="cards">
            <Link to="">
              <img src={img1} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="">Men's Top</Link>
          </h3>
        </div>
        <div className="cards-container">
          <div className="cards">
            <Link to="">
              <img src={img2} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="">Men's Bottom</Link>
          </h3>
        </div>
        <div className="cards-container">
          <div className="cards">
            <Link to="">
              <img src={img3} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="">Women's Top</Link>
          </h3>
        </div>
        <div className="cards-container">
          <div className="cards">
            <Link to="">
              <img src={img4} alt="" className="w-[300px] max-h-[385px]" />
            </Link>
          </div>
          <h3 className="">
            <Link to="">Women's Bottom</Link>
          </h3>
        </div>
      </section>
      {/**best seller section goes here**/}
      <div className="our-story">
        <h4>Our Story</h4>
        <h2>
          We're Inspired by the Cities that Never Sleep and the Dreams that Keep
          Us Awake.
        </h2>
      </div>
    </>
  );
};

export default Home;
