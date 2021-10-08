import React, { useContext } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CryptoContex } from "../../context/CryptoContex";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

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

  const login = (e) => {
    e.preventDefault();
    setAuth(true);
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
                  onClick={top10HandlerFn}
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
                  Favourites{" "}
                  <sup>
                    <b>beta</b>
                  </sup>
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
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link " to="/login" onClick={login}>
                    Login
                  </Link>
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
