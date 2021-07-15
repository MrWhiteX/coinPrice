import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-5">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* <a className="navbar-brand" href="#">
          Navbar
        </a> */}
          <div
            className="collapse navbar-collapse flex-column-reverse flex-md-row "
            id="navbarTogglerDemo03"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold fs-4  ">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Top10
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favourites" className="nav-link active">
                  Favourites
                </Link>
              </li>
            </ul>
            <Searchbar />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
