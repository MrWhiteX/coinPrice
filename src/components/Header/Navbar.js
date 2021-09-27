import React, { useContext } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CryptoContex } from "../../CryptoContex";
//import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  // const reduxTest = useSelector((state) => state.name);
  const { getFavorites, top10Handler } = useContext(CryptoContex);

  //console.log("reduxTest", reduxTest);
  const top10HandlerFn = () => {
    top10Handler();
  };

  const getFavoritesFn = () => {
    getFavorites();
  };

  return (
    <div className="mt-3">
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
                <Link
                  to="/"
                  onClick={top10HandlerFn}
                  className="nav-link active"
                >
                  Top 10
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/favorites"
                  className="nav-link active"
                  onClick={getFavoritesFn}
                >
                  Favourites{" "}
                  <sup>
                    <b>beta</b>
                  </sup>
                </Link>
              </li>
            </ul>
            <span style={{ marginRight: "10px" }}>
              Powered by <b>Coinpaprika</b>
            </span>

            {location.pathname === "/" ? <Searchbar /> : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
