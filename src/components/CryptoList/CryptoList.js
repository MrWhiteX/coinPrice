import React, { useContext, useEffect, useState } from "react";
import { CryptoContex } from "../../CryptoContex";
import CryptoListHeader from "./CryptoListHeader";
import CryptoRow from "./CryptoRow";

const CryptoList = () => {
  const { crypto, loading } = useContext(CryptoContex);
  const [isSorted, serIsSorted] = useState(false);

  useEffect(() => {
    // setStateCrypto(crypto);
    console.log("cryptoooooooooooooooooo", crypto);
    console.log("loading", loading);
  }, [crypto]);

  const sortFn = () => {
    serIsSorted(!isSorted);
  };

  return (
    <div className="container fs-5">
      <CryptoListHeader />

      {loading === false ? (
        <div
          className="spinner-border text-primary position-absolute end-50 mt-5"
          role="status"
        ></div>
      ) : (
        <CryptoRow isSorted={isSorted} crypto={crypto} />
      )}

      {crypto.length === 0 && loading && (
        <span className="mt-5 fs-5 d-flex justify-content-center text-danger fw-bold ">
          No crypto here ;(
        </span>
      )}
    </div>
  );
};

export default CryptoList;
