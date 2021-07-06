import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="container pt-5">
        <div className="row d-flex align-items-center fs-4 fs-sm-2 text-left">
          <div className="col-md-3">
            <a href="#">
              <img src="logo.jpeg" alt="" className="img-fluid" />
            </a>
          </div>
          <div className="col-md-3  ">
            <span className="">Market Cap</span>
            <p className="fw-bold">$1,370,528,501,254</p>
          </div>
          <div className="col-md-3 ">
            24h Vol:
            <p className="fw-bold">$74,648,853,385</p>
          </div>
          <div className="col-md-3  ">
            BTC Dominance:
            <p className="fw-bold">47.1%</p>
          </div>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
