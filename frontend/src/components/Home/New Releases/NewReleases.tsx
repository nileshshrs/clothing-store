import React, { useState } from "react";
import Tabview1 from "../Tabview/Tabview1";
import Tabview2 from "../Tabview/Tabview2";
import "./NewRelease.scss";
import { Link } from "react-router-dom";

const NewReleases = () => {
  const [tab, setTab] = useState(1);
  const switchTab = (index) => {
    setTab(index);
  };


  return (
    <section className="new-releases">
      <div className="new-release-container">
        <div className="new-release-heading-container">
          <h2>Shop New Releases</h2>
          <div className="tab-btn">
            <button
              className={tab === 1 ? "tabs active-tab" : "tabs"}
              onClick={() => switchTab(1)}
            >
              Men
            </button>
            <button
              className={tab === 2 ? "tabs active-tab" : "tabs"}
              onClick={() => switchTab(2)}
            >
              Women
            </button>
          </div>
        </div>
        <div className="shop-btn">
          <Link to="/clothes">
            <button>Shop All</button>
          </Link>
        </div>
      </div>
      <div className="tab-container">
        <div className={tab === 1 ? "content active-content" : "content"}>
          <Tabview1 />
        </div>
        <div className={tab === 2 ? "content active-content" : "content"}>
          <Tabview2 />
        </div>
      </div>
      <div className="shop-btn-btm">
        <Link to="">
          <button>Shop All</button>
        </Link>
      </div>
    </section>
  );
};

export default NewReleases;
