import React from "react";
import Pagination from "./Pagination";

const CryptoRow = (props) => {
  const { crypto, isSorted } = props;

  const sortedCrypto = () =>
    crypto.sort(function (a, b) {
      return a.rank - b.rank;
    });

  const sortedCryptoBy7d = () =>
    crypto.sort(function (a, b) {
      return a.quotes.USD.price - b.quotes.USD.price;
    });

  console.log(sortedCryptoBy7d);
  console.log(sortedCrypto);
  console.log(isSorted);

  return (
    <>
      <Pagination
        data={isSorted ? sortedCryptoBy7d() : sortedCrypto()}
        pageLimit={5}
        dataLimit={10}
        crypto={crypto}
      />
    </>
  );
};

export default CryptoRow;
