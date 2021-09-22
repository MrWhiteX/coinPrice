import React, { useContext } from "react";
import { CryptoContex } from "../../CryptoContex";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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

                  <div className="row mt-4 d-flex">
                    <div className="col-12 d-flex flex-column flex-md-row  ">
                      <div className="col-12 col-md-4 d ">
                        <div className="card" style={{ maxWidth: "20rem" }}>
                          <div className="card-header fw-bold">
                            <span>{singleCrypto.name} Price</span>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">
                              <span>
                                {singleCrypto.quotes.USD.price.toFixed(2)} USD
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 mt-4 mt-md-0">
                        <div className="card  " style={{ maxWidth: "20rem" }}>
                          <div className="card-header fw-bold">
                            <span>Highest price (All Time)</span>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">
                              {singleCrypto.quotes.USD.ath_price.toFixed(2)}
                              USD
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 mt-4 mt-md-0">
                        <div className="card  " style={{ maxWidth: "20rem" }}>
                          <div className="card-header fw-bold">
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
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 d-flex flex-column flex-md-row">
                      <div className="col-12 col-md-4">
                        <div className="card" style={{ maxWidth: "20rem" }}>
                          <div className="card-header fw-bold">
                            <span>Price Change (30 day)</span>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">
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
                      </div>
                      <div className="col-12 col-md-4 mt-4 mt-md-0">
                        <div className="card" style={{ maxWidth: "20rem" }}>
                          <div className="card-header fw-bold">
                            <span>Max Supply</span>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">
                              <span>
                                {singleCrypto.max_supply}
                                {singleCrypto.symbol}
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 mt-4 mb-4 mb-md-0 mt-md-0">
                        <div className="card  " style={{ maxWidth: "20rem" }}>
                          <div className="card-header fw-bold">
                            <span>Market Cap</span>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">
                              <span>
                                {singleCrypto.quotes.USD.market_cap} USD
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
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
