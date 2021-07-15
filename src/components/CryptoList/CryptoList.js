import React, { useContext, useEffect, useState } from "react";
import { CryptoContex } from "../../CryptoContex";
import CryptoRow from "./CryptoRow";

const CryptoList = () => {
  const { crypto, loading } = useContext(CryptoContex);

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
            {loading === false ? (
              <div
                className="spinner-border text-primary position-absolute end-50 mt-5"
                role="status"
              ></div>
            ) : (
              <CryptoRow crypto={crypto} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
