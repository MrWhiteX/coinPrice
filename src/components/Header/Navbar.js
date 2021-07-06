import React from "react";

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
                <a className="nav-link active  " aria-current="page" href="#">
                  Top10
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Favourites
                </a>
              </li>
            </ul>
            <form className="d-flex ">
              <input
                type="text"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />

              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
