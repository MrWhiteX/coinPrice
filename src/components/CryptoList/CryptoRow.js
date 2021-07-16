import React from "react";
import Pagination from "./Pagination";
import { CryptoContex } from "../../CryptoContex";

const CryptoRow = (props) => {
  const { crypto } = props;
  const sortedCrypto = crypto.sort(function (a, b) {
    return a.rank - b.rank;
  });

  return (
    <>
      <Pagination
        data={sortedCrypto}
        pageLimit={5}
        dataLimit={10}
        crypto={crypto}
      />
    </>
  );
};

export default CryptoRow;
