import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CryptoRow = (props) => {
  const { crypto } = props;

  const sortedCrypto = crypto.sort(function (a, b) {
    return a.rank - b.rank;
  });

  const handleFavouriteClick = (currency) => {
    const saveCurrencyToLocalStorage = currency;
    let dataFromLocalStorage = [];
    if (localStorage.getItem("favourite") != null) {
      dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
      dataFromLocalStorage.push(saveCurrencyToLocalStorage);
      localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));
    } else {
      dataFromLocalStorage.push(saveCurrencyToLocalStorage);
      localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));
    }
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
