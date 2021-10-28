import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  getActualCurrency,
  getCurrency,
  getReloadComponentValue,
  reloadComponent,
} from "../../store/cryptoSlice";
import { useSelector } from "react-redux";

const CryptoRow = ({ crypto }) => {
  const [isFav, setIsFav] = useState(true);
  const idCryptoFav = [];

  const dispatch = useDispatch();
  const dataCurrency = useSelector(getCurrency);
  const actualCurrency = useSelector(getActualCurrency);
  const reloadComponentValue = useSelector(getReloadComponentValue);

  const localData = JSON.parse(localStorage.getItem("favourite"));

  function getIdFromLocalStorage() {
    if (localData != null) {
      localData.map((item) => {
        idCryptoFav.push(item.id);
      });
    }
  }
  getIdFromLocalStorage();

  function checkIdAlreadyExist(currency) {
    if (idCryptoFav.includes(currency.id)) {
      const indx = idCryptoFav.indexOf(currency.id);
      localData.splice(indx, 1);
      localStorage.setItem("favourite", JSON.stringify(localData));
    }
  }

  const handleFavouriteClick = (currency, index) => {
    setIsFav(!isFav);

    const saveCurrencyToLocalStorage = currency;
    let dataFromLocalStorage = [];

    if (localStorage.getItem("favourite") != null) {
      dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
      const getCryptoId = dataFromLocalStorage.map((idcrypto) => {
        return idcrypto.id;
      });

      if (
        Object.values(getCryptoId).indexOf(saveCurrencyToLocalStorage.id) > -1
      ) {
        console.log("has test1");
        checkIdAlreadyExist(currency);
        dispatch(reloadComponent(!reloadComponentValue));
      } else {
        console.log("moge dodac");
        dataFromLocalStorage.push(saveCurrencyToLocalStorage);
        localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));
      }
    } else {
      console.log("else");
      dataFromLocalStorage.push(saveCurrencyToLocalStorage);
      localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));
    }
  };

  return (
    <div>
      {crypto.map((currency) => {
        return (
          <div key={currency.id} className="nice row mb-4 mb-md-0 ">
            <div className="col-1 col-sm-1 ">{currency.rank}</div>

            <div className="col-6 col-sm-4 ">
              <span className="d-flex justify-content-start ">
                <Link
                  to={`/details/${currency.id}`}
                  className="text-decoration-none text-dark"
                >
                  <b>{currency.name} </b>
                </Link>
                <span style={{ marginLeft: "10px" }}>({currency.symbol})</span>
              </span>
            </div>

            <div className="col-5 col-sm-2">
              <span className="d-flex justify-content-end">
                {actualCurrency === "USD" ? (
                  <>
                    {currency.quotes.USD.price > 1
                      ? currency.quotes.USD.price.toFixed(2)
                      : currency.quotes.USD.price < 0.0001
                      ? currency.quotes.USD.price.toFixed(8)
                      : currency.quotes.USD.price.toFixed(4)}{" "}
                  </>
                ) : null}
                {actualCurrency === "PLN" ? (
                  <>
                    {currency.quotes.USD.price > 1
                      ? (currency.quotes.USD.price * dataCurrency.USD).toFixed(
                          2
                        )
                      : currency.quotes.USD.price * dataCurrency.USD < 0.0001
                      ? (currency.quotes.USD.price * dataCurrency.USD).toFixed(
                          8
                        )
                      : (currency.quotes.USD.price * dataCurrency.USD).toFixed(
                          4
                        )}
                  </>
                ) : null}

                <span className="ms-2">{actualCurrency}</span>
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

              <span>{currency.quotes.USD.percent_change_24h}</span>

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

              <span>{currency.quotes.USD.percent_change_7d}</span>

              <sup className="d-sm-none"> 7d</sup>
            </div>

            <div className="offset-2 offset-sm-0 col-1 col-sm-1 d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                className="text-danger"
                icon={idCryptoFav.includes(currency.id) ? faStarSolid : faStar}
                style={{ cursor: "pointer" }}
                onClick={() => handleFavouriteClick(currency)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoRow;
