import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  getActualCurrency,
  getCryptoFavId,
  getCurrency,
  getReloadComponentValue,
  setCryptoFavId,
} from "../../store/cryptoSlice";
import { useSelector } from "react-redux";
import { userAxios } from "../../axios";
import useAuth from "../../hooks/useAuth";
import { objectArrayWithId } from "../../helpers/object";

const CryptoRow = ({ crypto }) => {
  const [isFav, setIsFav] = useState(false);
  const [favCrypto, setFavCrypto] = useState([]);
  const [auth] = useAuth();

  const history = useHistory();

  const dispatch = useDispatch();
  const dataCurrency = useSelector(getCurrency);
  const actualCurrency = useSelector(getActualCurrency);
  const reloadComponentValue = useSelector(getReloadComponentValue);
  const idCryptoFav = useSelector(getCryptoFavId);

  useEffect(() => {
    const fetchFavCrypto = async () => {
      try {
        const res = await userAxios.get(`/favourites.json`);

        const newFav = objectArrayWithId(res.data).filter(
          (fav) => fav.user_id === auth.userId
        );
        dispatch(setCryptoFavId(newFav.map((el) => el.currency.id)));
        setFavCrypto(newFav);
      } catch (ex) {
        console.log(ex.response);
      }
    };
    fetchFavCrypto();
  }, [isFav]);

  const handleFavouriteClick = async (currency) => {
    if (!auth) {
      history.push("/login");
    }

    if (!idCryptoFav.includes(currency.id)) {
      try {
        const res = await userAxios.post(`/favourites.json`, {
          currency,
          user_id: auth.userId,
        });
        setIsFav(!isFav);
      } catch (ex) {
        console.log(ex.response);
      }
    } else {
    }
    const testmap2 = favCrypto.map(async (el) => {
      if (el.currency.id === currency.id) {
        try {
          const res = await userAxios.delete(`/favourites/${el.id}.json`);
          setIsFav(!isFav);
        } catch (ex) {
          console.log(ex.response);
        }
      }
    });
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
              <span className="d-flex justify-content-end fw-bold">
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

                <span className="ms-2 fw-light">{actualCurrency}</span>
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

              {currency.quotes.USD.percent_change_24h < 0 ? (
                <span className="fw-bold" style={{ color: "red" }}>
                  {currency.quotes.USD.percent_change_24h}
                </span>
              ) : (
                <span className="fw-bold" style={{ color: "green" }}>
                  {currency.quotes.USD.percent_change_24h}
                </span>
              )}

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

              {currency.quotes.USD.percent_change_7d < 0 ? (
                <span className="fw-bold" style={{ color: "red" }}>
                  {currency.quotes.USD.percent_change_7d}
                </span>
              ) : (
                <span className="fw-bold" style={{ color: "green" }}>
                  {currency.quotes.USD.percent_change_7d}
                </span>
              )}

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
