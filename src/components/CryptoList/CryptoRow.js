import React from "react";

const CryptoRow = (props) => {
  const { crypto } = props;

  const sortedCrypto = crypto.sort(function (a, b) {
    return a.rank - b.rank;
  });

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
            <td>STAR</td>
          </tr>
        );
      })}
    </>
  );
};

export default CryptoRow;
