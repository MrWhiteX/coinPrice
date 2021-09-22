import React from "react";
import Pagination from "./Pagination";

const CryptoRow = (props) => {
  const { crypto, paginationInfo } = props;
  const sortedCrypto = crypto.sort(function (a, b) {
    return a.rank - b.rank;
  });

  return (
    <>
      <Pagination
        data={sortedCrypto}
        pageLimit={5}
        dataLimit={paginationInfo.unlimited ? paginationInfo.unlimited : 10}
        crypto={crypto}
        paginationInfo={paginationInfo.favsite}
      />
    </>
  );
};

export default CryptoRow;
