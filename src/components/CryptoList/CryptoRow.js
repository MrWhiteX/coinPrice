import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CryptoRow = (props) => {
  const { crypto } = props;

  const sortedCrypto = crypto.sort(function (a, b) {
    return a.rank - b.rank;
  });

  const handleFavouriteClick = (currency) => {
    console.log(currency);
    localStorage.setItem(`${currency.symbol}`, JSON.stringify(currency));
  };

  return (
    <>
      {sortedCrypto.map((currency) => {
        return (
          <tr key={currency.rank}>
            <th scope="row">{currency.rank}</th>
            <td>
              {currency.name}({currency.symbol})
            </td>
            <td>{currency.quotes.USD.price}</td>
            <td>{currency.quotes.USD.percent_change_24h}</td>
            <td>{currency.quotes.USD.percent_change_7d}</td>
            <td>
              <FontAwesomeIcon
                className="text-danger"
                icon={faStar}
                style={{ cursor: "pointer" }}
                onClick={() => handleFavouriteClick(currency)}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default CryptoRow;
