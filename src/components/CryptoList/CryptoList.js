import React, { useContext, useEffect, useState } from "react";
import { CryptoContex } from "../../CryptoContex";
import CryptoListHeader from "./CryptoListHeader";
import CryptoRow from "../CryptoRow/CryptoRow";
import Pagination from "../Pagination/Pagination";

const CryptoList = () => {
  const { isSearchTerm, crypto, loading } = useContext(CryptoContex);
  const [isSorted, serIsSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptoPerPage, setCryptoPerPage] = useState(10);
  const [pageLimit, setPageLimit] = useState(5);

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

  // Previous page btn
  const previousPage = () => {
    if (currentPage >= 2) {
      setCurrentPage((pageNumber) => pageNumber - 1);
    }
  };

  // Next page btn
  const nextPage = () => {
    setCurrentPage((pageNumber) => pageNumber + 1);
  };

  const getPaginationGroup = () => {
    if (isSearchTerm === true) {
      setPageLimit(Math.ceil(crypto.length / 10));
    }

    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
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
            // cryptoPerPage={cryptoPerPage}
            // totalCrypto={crypto.length}
            paginate={paginate}
            getPaginationGroup={getPaginationGroup}
            previousPage={previousPage}
            nextPage={nextPage}
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
