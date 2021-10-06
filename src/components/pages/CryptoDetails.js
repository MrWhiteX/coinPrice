import React, { useContext } from "react";
import { CryptoContex } from "../../CryptoContex";
import { ConvertContex } from "../../ConvertContext";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const CryptoDetails = () => {
  const { crypto, loading } = useContext(CryptoContex);
  const { dataCurrency, actualCurrency } = useContext(ConvertContex);
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
              <div key={singleCrypto.id} className="container mt-5">
                <div className="row ">
                  <div className="col-sm-4">
                    <span className="fs-2">
                      <b>{singleCrypto.name}</b> ({singleCrypto.symbol})
                      <b className="ms-2">
                        {actualCurrency === "USD"
                          ? `${singleCrypto.quotes.USD.price.toFixed(2)} USD`
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

                <div className="row mt-5">
                  <div className="col-12 border-top text-start pt-3">
                    <p className="fs-5">
                      <b>Rank </b> {singleCrypto.rank}
                    </p>

                    <p className="fs-5">
                      <b>ATH Price </b>{" "}
                      {actualCurrency === "USD"
                        ? `${singleCrypto.quotes.USD.ath_price.toFixed(2)} USD `
                        : `${(
                            singleCrypto.quotes.USD.ath_price * dataCurrency.USD
                          ).toFixed(2)} PLN`}
                    </p>

                    <p className="fs-5">
                      <b>ATH Date</b> {singleCrypto.quotes.USD.ath_date}
                    </p>

                    <p className="fs-5">
                      <b>Circulating supply </b>{" "}
                      {singleCrypto.circulating_supply}
                    </p>
                    <p className="fs-5">
                      <b>Max supply </b> {singleCrypto.max_supply}
                    </p>

                    <p className="fs-5">
                      <b>Total supply </b> {singleCrypto.total_supply}
                    </p>
                  </div>

                  <div className="col-4"></div>

                  <div className="col-4"></div>
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

// {
//   <div key={singleCrypto.id} className="col-12 container text-dark mt-4">
//     <div className="">
//       <div className="container alert alert-dismissible alert-primary">
//         <span className="fs-3 fw-bold">
//           {singleCrypto.symbol} - Price Statistic
//         </span>
//       </div>
//       <div className="col-12 mt-5 d-flex  flex-wrap">
//         <div className="col-4 card mb-3  " style={{ maxWidth: "20rem" }}>
//           <div className="card-header fw-bold">
//             <span>{singleCrypto.name} Price</span>
//           </div>
//           <div className="card-body">
//             <h4 className="card-title">
//               {" "}
//               <span>{singleCrypto.quotes.USD.price.toFixed(2)} USD</span>
//             </h4>
//           </div>
//         </div>
//         <div className="col-4 card mb-3  " style={{ maxWidth: "20rem" }}>
//           <div className="card-header fw-bold">
//             <span>Highest price (All Time)</span>
//           </div>
//           <div className="card-body">
//             <h4 className="card-title">
//               {" "}
//               {singleCrypto.quotes.USD.ath_price.toFixed(2)} USD
//             </h4>
//           </div>
//         </div>
//         <div className="col-4 card mb-3 " style={{ maxWidth: "20rem" }}>
//           <div className="card-header fw-bold">
//             <span>Price Change (24h)</span>
//           </div>
//           <div className="card-body">
//             <h4 className="card-title">
//               <span>
//                 {singleCrypto.quotes.USD.percent_change_24h} %
//                 {singleCrypto.quotes.USD.percent_change_24h < 0 ? (
//                   <span className="ms-2">
//                     <FontAwesomeIcon
//                       className="text-danger"
//                       icon={faChevronDown}
//                     />
//                   </span>
//                 ) : (
//                   <span className="ms-2">
//                     <FontAwesomeIcon
//                       className="text-success"
//                       icon={faChevronUp}
//                     />
//                   </span>
//                 )}
//               </span>
//             </h4>
//           </div>
//         </div>
//         <div className="col-4 card mb-3  " style={{ maxWidth: "20rem" }}>
//           <div className="card-header fw-bold">
//             <span>Price Change (30 day)</span>
//           </div>
//           <div className="card-body">
//             <h4 className="card-title">
//               {" "}
//               <span>
//                 {singleCrypto.quotes.USD.percent_change_30d} %
//                 {singleCrypto.quotes.USD.percent_change_30d < 0 ? (
//                   <span className="ms-2">
//                     <FontAwesomeIcon
//                       className="text-danger"
//                       icon={faChevronDown}
//                     />
//                   </span>
//                 ) : (
//                   <span className="ms-2">
//                     <FontAwesomeIcon
//                       className="text-success"
//                       icon={faChevronUp}
//                     />
//                   </span>
//                 )}
//               </span>
//             </h4>
//           </div>
//         </div>
//         <div className="col-4 card mb-3  " style={{ maxWidth: "20rem" }}>
//           <div className="card-header fw-bold">
//             <span>Max Supply</span>
//           </div>
//           <div className="card-body">
//             <h4 className="card-title">
//               {" "}
//               <span>
//                 {singleCrypto.max_supply} {singleCrypto.symbol}
//               </span>{" "}
//             </h4>
//           </div>
//         </div>
//         <div className="col-4 card mb-3  " style={{ maxWidth: "20rem" }}>
//           <div className="card-header fw-bold">
//             <span>Market Cap</span>
//           </div>
//           <div className="card-body">
//             <h4 className="card-title">
//               {" "}
//               <span>{singleCrypto.quotes.USD.market_cap} USD</span>{" "}
//             </h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>;
// }
