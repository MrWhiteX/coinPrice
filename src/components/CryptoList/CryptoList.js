import React, { useState } from "react";
import CryptoListHeader from "./CryptoListHeader";
import CryptoRow from "../CryptoRow/CryptoRow";
import Pagination from "../Pagination/Pagination";
import {
  getCurrentPaginationPage,
  getIsSearchTerm,
} from "../../store/cryptoSlice";
import { getAllCrypto, getLoading } from "../../store/cryptoSlice";
import { useSelector } from "react-redux";

const CryptoList = () => {
  const [cryptoPerPage, setCryptoPerPage] = useState(10);
  const crypto = useSelector(getAllCrypto);
  const loading = useSelector(getLoading);
  const currentPage = useSelector(getCurrentPaginationPage);
  const isSearchTerm = useSelector(getIsSearchTerm);

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

      {loading ? (
        <div
          className="spinner-border text-primary position-absolute end-50 mt-5"
          role="status"
        ></div>
      ) : (
        <>
          <CryptoRow crypto={currentCrypto} />
          <Pagination
            cryptoPerPage={cryptoPerPage}
            changeCryptoPerPage={changeCryptoPerPage}
          />
        </>
      )}

      {crypto.length === 0 && !loading && (
        <span className="mt-5 fs-5 d-flex justify-content-center text-danger fw-bold ">
          No crypto here ;(
        </span>
      )}
    </div>
  );
};

export default CryptoList;
