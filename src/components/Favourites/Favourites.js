import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Favourites = () => {
  const [realtime, setRealtime] = useState(false);

  const favouriteCrypto = JSON.parse(localStorage.getItem("favourite"));
  const handleRemoveFavourite = (index) => {
    favouriteCrypto.splice(index, 1);
    localStorage.setItem("favourite", JSON.stringify(favouriteCrypto));

    setRealtime(!realtime);
    if (favouriteCrypto.length === 0) {
      localStorage.clear();
    }
  };

  useEffect(() => {
    console.log("useeff");
  }, []);

  return (
    <div className="container fs-5">
      <div className="bg-dark">
        <div className="row mb-1">
          <div className="col-1 col-sm-1">
            <span className="text-white fs-5 fw-bold">#</span>
          </div>

          <div className="col-7 col-sm-4">
            <span className="text-white fs-5 fw-bold d-flex justify-content-start">
              Crypto
            </span>
          </div>

          <div className="col-4 col-sm-2">
            <span className="mr-5 mr-sm-0 text-white fs-5 fw-bold d-flex justify-content-end">
              Price
            </span>
          </div>

          <div className="offset-1 offset-sm-1 col-4 col-sm-1">
            <span className="d-none d-sm-block text-white fs-5 fw-bold">
              24h
            </span>
          </div>

          <div className="col-3 col-sm-2">
            <span className="d-none d-sm-block text-white fs-5 fw-bold">
              7d
            </span>
          </div>

          <div className="col-1 col-sm-1 d-flex align-items-center">
            <span className="d-none d-sm-block text-white fs-5 fw-bold">
              Favorites
            </span>
          </div>
        </div>
      </div>
      <div>
        {favouriteCrypto == null
          ? null
          : favouriteCrypto.map((currency, index) => {
              return (
                <div
                  key={currency.id}
                  className="row mb-4 mb-md-0 border-bottom border-bottom-sm-0"
                >
                  <div className="col-1 col-sm-1 fw-bold">{currency.rank}</div>

                  <div className="col-6 col-sm-4">
                    <span className="d-flex justify-content-start">
                      <b>{currency.name} </b>
                      <span style={{ marginLeft: "10px" }}>
                        ({currency.symbol})
                      </span>
                    </span>
                  </div>

                  <div className="col-5 col-sm-2">
                    <span className="d-flex justify-content-end fw-bold">
                      {currency.quotes.USD.price.toFixed(2)} USD
                    </span>
                  </div>

                  <div className="offset-1 offset-sm-1 col-4 col-sm-1">
                    {currency.quotes.USD.percent_change_24h < 0 ? (
                      <span className="d-flex justify-content-center">
                        <FontAwesomeIcon
                          className="text-danger"
                          icon={faChevronDown}
                        />
                      </span>
                    ) : (
                      <span className="d-flex justify-content-center">
                        <FontAwesomeIcon
                          className="text-success"
                          icon={faChevronUp}
                        />
                      </span>
                    )}

                    <span className="fw-bold">
                      {currency.quotes.USD.percent_change_24h}
                    </span>

                    <sup className="d-sm-none"> 24h</sup>
                  </div>

                  <div className="col-4 col-sm-2">
                    {currency.quotes.USD.percent_change_7d < 0 ? (
                      <span className="d-flex justify-content-center">
                        <FontAwesomeIcon
                          className="text-danger"
                          icon={faChevronDown}
                        />
                      </span>
                    ) : (
                      <span className="d-flex justify-content-center">
                        <FontAwesomeIcon
                          className="text-success "
                          icon={faChevronUp}
                        />
                      </span>
                    )}

                    <span className="fw-bold">
                      {currency.quotes.USD.percent_change_7d}
                    </span>

                    <sup className="d-sm-none"> 7d</sup>
                  </div>

                  <div className="offset-2 offset-sm-0 col-1 col-sm-1 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faStar}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveFavourite(index)}
                    />
                  </div>
                </div>
              );
            })}
      </div>
      {favouriteCrypto == null ? (
        <span className="mt-5 fs-5 d-flex justify-content-center text-danger fw-bold ">
          Brak polubionych walut
        </span>
      ) : null}
    </div>
  );
};

export default Favourites;
