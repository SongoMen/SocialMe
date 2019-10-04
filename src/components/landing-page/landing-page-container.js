import React from "react";
import {Link} from "react-router-dom"
import TopMenu from "./top-menu";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <TopMenu />
      <div className="main">
        <div className="main__header">
          <h1>Social media analytics app.</h1>
          <Link to="/login">
          <button className="btn-white">Start now</button>
          </Link>
        </div>
        <img alt="preview" src={require("../../images/landingpage.png")}></img>
      </div>
    </div>
  );
};
export default LandingPage;
