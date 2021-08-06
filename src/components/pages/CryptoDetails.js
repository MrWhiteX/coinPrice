import React, { useContext } from "react";
import { CryptoContex } from "../../CryptoContex";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const CryptoDetails = () => {
  const { crypto, loading } = useContext(CryptoContex);
  const params = useParams();

  return (
    <>
      {loading === false ? (
        <div
          className="spinner-border text-primary position-absolute end-50 mt-5"
          role="status"
        ></div>
      ) : (
        crypto.map((singleCrypto) => {
          if (singleCrypto.id === params.id) {
            return (
              <>
                <div
                  key={singleCrypto.id}
                  className="col-12 container text-dark mt-4"
                >
                  <div className="">
                    <div className="container alert alert-dismissible alert-primary">
                      <span className="fs-3 fw-bold">
                        {singleCrypto.symbol} - Price Statistic
                      </span>
                    </div>
                    <div className="col-12 mt-5 d-flex justify-content-center flex-wrap">
                      <div
                        className="col-4 card mb-3 offset-1"
                        style={{ maxWidth: "20rem" }}
                      >
                        <div className="card-header">
                          <span>{singleCrypto.name} Price</span>
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">
                            {" "}
                            <span>
                              {singleCrypto.quotes.USD.price.toFixed(2)} USD
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div
                        className="col-4 card mb-3 offset-1"
                        style={{ maxWidth: "20rem" }}
                      >
                        <div className="card-header">
                          <span>Highest price (All Time)</span>
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">
                            {" "}
                            {singleCrypto.quotes.USD.ath_price.toFixed(2)} USD
                          </h4>
                        </div>
                      </div>
                      <div
                        className="col-4 card mb-3 offset-1"
                        style={{ maxWidth: "20rem" }}
                      >
                        <div className="card-header">
                          <span>Price Change (24h)</span>
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">
                            <span>
                              {singleCrypto.quotes.USD.percent_change_24h} %
                              {singleCrypto.quotes.USD.percent_change_24h <
                              0 ? (
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
                          </h4>
                        </div>
                      </div>
                      <div
                        className="col-4 card mb-3 offset-1"
                        style={{ maxWidth: "20rem" }}
                      >
                        <div className="card-header">
                          <span>Price Change (30 day)</span>
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">
                            {" "}
                            <span>
                              {singleCrypto.quotes.USD.percent_change_30d} %
                              {singleCrypto.quotes.USD.percent_change_30d <
                              0 ? (
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
                          </h4>
                        </div>
                      </div>
                      <div
                        className="col-4 card mb-3 offset-1"
                        style={{ maxWidth: "20rem" }}
                      >
                        <div className="card-header">
                          <span>Max Supply</span>
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">
                            {" "}
                            <span>
                              {singleCrypto.max_supply} {singleCrypto.symbol}
                            </span>{" "}
                          </h4>
                        </div>
                      </div>
                      <div
                        className="col-4 card mb-3 offset-1"
                        style={{ maxWidth: "20rem" }}
                      >
                        <div className="card-header">
                          <span>Market Cap</span>
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">
                            {" "}
                            <span>
                              {singleCrypto.quotes.USD.market_cap} USD
                            </span>{" "}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-12 bg-dark">
                    <span className="fs-5 fw-bold">
                      {singleCrypto.symbol} - Price Statistic
                    </span>
                  </div>

                  <div className="row text-dark fs-5 fw-bold mt-4 d-flex">
                    <div className="d-flex justify-content-between border-bottom border-bottom-sm-0 ">
                      <span>{singleCrypto.name} Price</span>
                      <span>
                        {singleCrypto.quotes.USD.price.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="d-flex justify-content-between  mt-3 border-bottom border-bottom-sm-0">
                      <span>Highest price (All Time)</span>
                      <span>
                        {singleCrypto.quotes.USD.ath_price.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mt-3 border-bottom border-bottom-sm-0">
                      <span>Price Change (24h)</span>
                      <span>
                        {singleCrypto.quotes.USD.percent_change_24h} %
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
                    <div className="d-flex justify-content-between mt-3 border-bottom border-bottom-sm-0">
                      <span>Price Change (30 day)</span>
                      <span>
                        {singleCrypto.quotes.USD.percent_change_30d} %
                        {singleCrypto.quotes.USD.percent_change_30d < 0 ? (
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
                    <div className="d-flex justify-content-between mt-3 border-bottom border-bottom-sm-0">
                      <span>Max Supply</span>
                      <span>
                        {singleCrypto.max_supply} {singleCrypto.symbol}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mt-3 border-bottom border-bottom-sm-0">
                      <span>Market Cap</span>
                      <span>{singleCrypto.quotes.USD.market_cap} USD</span>
                    </div>
                  </div> */}
                </div>
              </>
            );
          }
        })
      )}
    </>
  );
};

export default CryptoDetails;
