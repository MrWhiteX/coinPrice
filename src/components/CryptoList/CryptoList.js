import React, { useContext, useEffect, useState } from "react";
import { CryptoContex } from "../../context/CryptoContex";
import CryptoListHeader from "./CryptoListHeader";
import CryptoRow from "../CryptoRow/CryptoRow";
import Pagination from "../Pagination/Pagination";

const CryptoList = () => {
  const { isSearchTerm, crypto, loading, currentPage } =
    useContext(CryptoContex);
  const [isSorted, serIsSorted] = useState(false);
  const [cryptoPerPage, setCryptoPerPage] = useState(10);

  // useEffect(() => {
  //   // setStateCrypto(crypto);
  //   console.log("cryptoooooooooooooooooo", crypto);
  //   console.log("loading", loading);
  // }, [crypto]);

  const sortFn = () => {
    serIsSorted(!isSorted);
  };

  // Get current crypto
  const indexOfLastCrypto = currentPage * cryptoPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptoPerPage;
  const currentCrypto = crypto.slice(indexOfFirstCrypto, indexOfLastCrypto);

  const changeCryptoPerPage = (rows) => {
    if (isSearchTerm === true) {
      setCryptoPerPage(10);
    } else {
      setCryptoPerPage(rows);
    }
  };

  return (
    <div className="container fs-5  ">
      <CryptoListHeader />

      {loading === false ? (
        <div
          className="spinner-border text-primary position-absolute end-50 mt-5"
          role="status"
        ></div>
      ) : (
        <>
          <CryptoRow isSorted={isSorted} crypto={currentCrypto} />
          <Pagination
            cryptoPerPage={cryptoPerPage}
            changeCryptoPerPage={changeCryptoPerPage}
          />
        </>
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
