import React, { useContext } from "react";
import { CryptoContex } from "../../CryptoContex";
import { useParams } from "react-router";

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
                  className="col-12 container text-white "
                >
                  <div className="col-12 bg-dark">
                    <span className="fs-5 fw-bold">
                      {singleCrypto.symbol} - Price Statistic
                    </span>
                  </div>

                  <div className="row   text-dark fs-5 fw-bold mt-4">
                    <div className="d-flex align-items-center border-bottom border-bottom-sm-0 ">
                      <span className="col-6  ">{singleCrypto.name} Price</span>
                      <span className="col-6">
                        {singleCrypto.quotes.USD.price.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-3 border-bottom border-bottom-sm-0">
                      <span className="col-6">Highest price (All Time)</span>
                      <span className="col-6 ">
                        {singleCrypto.quotes.USD.ath_price.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-3 border-bottom border-bottom-sm-0">
                      <span className="col-6">Price Change (24h)</span>
                      <span className="col-6">
                        {singleCrypto.quotes.USD.percent_change_24h} %
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-3 border-bottom border-bottom-sm-0">
                      <span className="col-6">Price Change (30 day)</span>
                      <span className="col-6 ">
                        {singleCrypto.quotes.USD.percent_change_30d} %
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-3 border-bottom border-bottom-sm-0">
                      <span className="col-6">Max Supply</span>
                      <span className="col-6">
                        {singleCrypto.max_supply} {singleCrypto.symbol}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-3 border-bottom border-bottom-sm-0">
                      <span className="col-6">Market Cap</span>
                      <span className="col-6">
                        {singleCrypto.quotes.USD.market_cap} USD
                      </span>
                    </div>
                  </div>
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
