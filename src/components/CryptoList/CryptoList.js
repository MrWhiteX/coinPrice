import React, { useContext } from "react";
import { CryptoContex } from "../../CryptoContex";
import CryptoRow from "./CryptoRow";

const CryptoList = () => {
  const { crypto, loading } = useContext(CryptoContex);

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
            <span className="text-white fs-5 fw-bold d-flex justify-content-end">
              Price
            </span>
          </div>

          <div className="offset-1 offset-sm-1 col-4 col-sm-1">
            <span className="text-white fs-5 fw-bold">24h</span>
          </div>

          <div className="col-3 col-sm-2">
            <span className="text-white fs-5 fw-bold">7d</span>
          </div>

          <div className="col-1 col-sm-1 d-flex align-items-center">
            <span className="text-white fs-5 fw-bold">Favorites</span>
          </div>
        </div>
      </div>

      {loading === false ? (
        <div
          className="spinner-border text-primary position-absolute end-50 mt-5"
          role="status"
        ></div>
      ) : (
        <CryptoRow crypto={crypto} />
      )}
    </div>
  );
};

export default CryptoList;
