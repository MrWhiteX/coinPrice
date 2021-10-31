import React from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import useWebsiteTitle from "../hooks/useWebsiteTitle";
import { useSelector } from "react-redux";
import millify from "millify";

import {
  getActualCurrency,
  getAllCrypto,
  getCurrency,
  getLoading,
} from "../store/cryptoSlice";

const CryptoDetails = () => {
  const dataCurrency = useSelector(getCurrency);
  const actualCurrency = useSelector(getActualCurrency);
  const params = useParams();
  const setTitle = useWebsiteTitle();
  const loading = useSelector(getLoading);
  const crypto = useSelector(getAllCrypto);

  return (
    <>
      {loading ? (
        <div
          className="spinner-border text-primary position-absolute end-50 mt-5"
          role="status"
        ></div>
      ) : (
        crypto.map((singleCrypto) => {
          if (singleCrypto.id === params.id) {
            setTitle(`CoinPrice.pl - ${singleCrypto.name}`);
            return (
              <div key={singleCrypto.id} className="container mt-5">
                <div className="row ">
                  <div className="col-sm-4">
                    <span className="fs-2">
                      <b>{singleCrypto.name}</b> ({singleCrypto.symbol})
                      <b className="ms-2">
                        {actualCurrency === "USD"
                          ? `${
                              singleCrypto.quotes.USD.price > 1
                                ? singleCrypto.quotes.USD.price.toFixed(2)
                                : singleCrypto.quotes.USD.price < 0.0001
                                ? singleCrypto.quotes.USD.price.toFixed(8)
                                : singleCrypto.quotes.USD.price.toFixed(4)
                            } USD`
                          : `${(
                              singleCrypto.quotes.USD.price * dataCurrency.USD
                            ).toFixed(2)} PLN`}
                      </b>
                    </span>
                  </div>

                  <div className="col-2"></div>

                  <div className="col-2 ">
                    <span className="fs-2">
                      <b>1H </b>
                      {singleCrypto.quotes.USD.percent_change_1h} %
                      {singleCrypto.quotes.USD.percent_change_1h < 0 ? (
                        <span className="ms-2">
                          <FontAwesomeIcon
                            className="text-danger"
                            icon={faChevronDown}
                          />
                        </span>
                      ) : (
                        <span className="ms-2">
                          <FontAwesomeIcon
                            className="text-success"
                            icon={faChevronUp}
                          />
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="col-2">
                    <span className="fs-2">
                      <b>24H </b> {singleCrypto.quotes.USD.percent_change_24h} %
                      {singleCrypto.quotes.USD.percent_change_24h < 0 ? (
                        <span className="ms-2">
                          <FontAwesomeIcon
                            className="text-danger"
                            icon={faChevronDown}
                          />
                        </span>
                      ) : (
                        <span className="ms-2">
                          <FontAwesomeIcon
                            className="text-success"
                            icon={faChevronUp}
                          />
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="col-2">
                    <span className="fs-2">
                      <b>7D </b> {singleCrypto.quotes.USD.percent_change_7d} %
                      {singleCrypto.quotes.USD.percent_change_7d < 0 ? (
                        <span className="ms-2">
                          <FontAwesomeIcon
                            className="text-danger"
                            icon={faChevronDown}
                          />
                        </span>
                      ) : (
                        <span className="ms-2">
                          <FontAwesomeIcon
                            className="text-success"
                            icon={faChevronUp}
                          />
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="row mt-5 border-bottom border-top">
                  <div className="col-4 pt-3">
                    <p className="fs-5">
                      <b>Rank </b> {singleCrypto.rank}
                    </p>

                    <p className="fs-5">
                      <b>ATH Price </b>{" "}
                      {actualCurrency === "USD"
                        ? `${singleCrypto.quotes.USD.ath_price} USD `
                        : `${
                            singleCrypto.quotes.USD.ath_price * dataCurrency.USD
                          } PLN`}
                    </p>
                  </div>

                  <div className="col-4 pt-3">
                    <p className="fs-5">
                      <b>ATH Date</b> {singleCrypto.quotes.USD.ath_date}
                    </p>

                    <p className="fs-5">
                      <b>Circulating supply </b>

                      {millify(
                        singleCrypto.circulating_supply
                          ? singleCrypto.circulating_supply
                          : 0,
                        {
                          units: ["B", "KB", "M", "B", "T"],
                          space: true,
                        }
                      )}
                    </p>
                  </div>

                  <div className="col-4 pt-3">
                    <p className="fs-5">
                      <b>Max supply </b>
                      {millify(
                        singleCrypto.max_supply ? singleCrypto.max_supply : 0,
                        {
                          units: ["B", "KB", "M", "B", "T"],
                          space: true,
                        }
                      )}
                    </p>

                    <p className="fs-5">
                      <b>Total supply </b>
                      {millify(
                        singleCrypto.total_supply
                          ? singleCrypto.total_supply
                          : 0,
                        {
                          units: ["B", "KB", "M", "B", "T"],
                          space: true,
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })
      )}
    </>
  );
};

export default CryptoDetails;
