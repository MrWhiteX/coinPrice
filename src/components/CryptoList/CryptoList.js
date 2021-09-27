import React, { useContext, useEffect, useState } from "react";
import { CryptoContex } from "../../CryptoContex";
import CryptoListHeader from "./CryptoListHeader";
import Pagination from "../Pagination/Pagination";
import CryptoRow from "../CryptoRow/CryptoRow";

const CryptoList = () => {
  const { crypto, loading } = useContext(CryptoContex);
  const [isSorted, serIsSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptoPerPage, setCryptoPerPage] = useState(10);

  useEffect(() => {
    // setStateCrypto(crypto);
    console.log("cryptoooooooooooooooooo", crypto);
    console.log("loading", loading);
  }, [crypto]);

  const sortFn = () => {
    serIsSorted(!isSorted);
  };

  // Get current crypto
  const indexOfLastCrypto = currentPage * cryptoPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptoPerPage;
  const currentCrypto = crypto.slice(indexOfFirstCrypto, indexOfLastCrypto);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <>
          <CryptoRow isSorted={isSorted} crypto={currentCrypto} />
          <Pagination
            cryptoPerPage={cryptoPerPage}
            totalCrypto={crypto.length / 50}
            paginate={paginate}
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
