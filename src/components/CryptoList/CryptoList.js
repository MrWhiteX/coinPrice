import React, { useEffect, useState } from "react";
import fetchCrypto from "./Data/CryptoApi";
import CryptoRow from "./CryptoRow";

const CryptoList = () => {
  const [crypto, setCrypto] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCrypto().then((data) => {
      setCrypto(data);
      setLoading(true);
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-borderless table-hover fs-5">
          <thead className="">
            <tr className="table-dark">
              <th scope="col">#</th>
              <th scope="col">Crypto</th>
              <th scope="col">Price</th>
              <th scope="col">24h</th>
              <th scope="col">7d</th>
              <th scope="col">Favourite</th>
            </tr>
          </thead>
          <tbody>
            {loading === false ? (
              <div class="spinner-border text-primary" role="status"></div>
            ) : (
              <CryptoRow crypto={crypto} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// {crypto.map((currency) => {
//   return (
//     <tr key={currency.rank}>
//       <th scope="row">{currency.rank}</th>
//       <td>
//         {currency.name}({currency.symbol})
//       </td>
//       <td>{currency.quotes.USD.price}</td>
//       <td>{currency.quotes.USD.percent_change_24h}</td>
//       <td>{currency.quotes.USD.percent_change_7d}</td>
//       <td>
//         <FontAwesomeIcon icon={["fas", "faa-star"]} />
//       </td>
//     </tr>
//   );
// })}

export default CryptoList;
