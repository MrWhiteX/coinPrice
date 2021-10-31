import React, { useContext } from "react";
import { CryptoContex } from "../../context/CryptoContex";
import Searchbar from "../Searchbar/Searchbar";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addCrypto,
  currentPaginationPage,
  getCryptoCopy,
  isSearchTerm,
} from "../../store/cryptoSlice";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const setTitle = useWebsiteTitle();
  const location = useLocation();
  const { getFavorites } = useContext(CryptoContex);

  const dispatch = useDispatch();
  const cryptoCopy = useSelector(getCryptoCopy);

  const top10Handler = () => {
    setTitle("CoinPrice.pl - Main Page");
    dispatch(addCrypto(cryptoCopy));
    dispatch(currentPaginationPage(1));
    dispatch(isSearchTerm(false));
  };

  const getFavoritesFn = () => {
    getFavorites();
  };

  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
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
                <NavLink
                  exact
                  to="/"
                  onClick={top10Handler}
                  className="nav-link"
                  activeClassName="active text-decoration-underline"
                >
                  Top 10
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/favorites"
                  className="nav-link"
                  activeClassName=" active text-decoration-underline"
                  onClick={getFavoritesFn}
                >
                  Favourites
                </NavLink>
              </li>

              {auth ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active text-decoration-underline"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active text-decoration-underline"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              )}
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
