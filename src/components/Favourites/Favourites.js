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
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-borderless table-hover fs-5">
          <thead className="">
            <tr className="table-dark">
              <th scope="col">#</th>
              <th scope="col">Crypto</th>
              <th scope="col">Price</th>
              <th scope="col">24h</th>
              <th scope="col">7d</th>
              <th scope="col">Favourite</th>
            </tr>
          </thead>
          <tbody>
            {favouriteCrypto == null
              ? null
              : favouriteCrypto.map((currency, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <span style={{ marginRight: "10px" }}>
                          {currency.name}
                        </span>
                        (<span className="fw-bold">{currency.symbol}</span>)
                      </td>
                      <td className="fw-bold">
                        {" "}
                        {currency.quotes.USD.price.toFixed(2)} USD
                      </td>
                      <td className="d-flex flex-column ">
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

                        {currency.quotes.USD.percent_change_24h}
                      </td>
                      <td>
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
                        {currency.quotes.USD.percent_change_7d}
                      </td>
                      <td>
                        <FontAwesomeIcon
                          className="text-danger"
                          icon={faStar}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveFavourite(index)}
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {favouriteCrypto == null ? (
          <span className="mt-5 fs-5 d-flex justify-content-center text-danger fw-bold ">
            Brak polubionych walut
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Favourites;
