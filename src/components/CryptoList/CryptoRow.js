import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const CryptoRow = (props) => {
  const { crypto } = props;
  const sortedCrypto = crypto.sort(function (a, b) {
    return a.rank - b.rank;
  });



  const handleFavouriteClick = (currency) => {
    const saveCurrencyToLocalStorage = currency;
    let dataFromLocalStorage = [];
    console.log("SAVECURRENCYID", saveCurrencyToLocalStorage.id)
    //console.log("DATAFROMLOCALID", dataFromLocalStorage)


    if (localStorage.getItem("favourite") != null) {
      dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
      const getCryptoId = dataFromLocalStorage.map((idcrypto) => {
        return idcrypto.id
      })

    if (Object.values(getCryptoId).indexOf(saveCurrencyToLocalStorage.id) > -1) {
         console.log('has test1');
     }
     else{

      console.log("moge dodac")
      dataFromLocalStorage.push(saveCurrencyToLocalStorage);
      localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));

     }
    
    } else {
      console.log("else")
      dataFromLocalStorage.push(saveCurrencyToLocalStorage);
      localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));
    }
  };


  return (
    <>
      {sortedCrypto.map((currency) => {
        return (
          <tr key={currency.id}>
            <th scope="row">{currency.rank}</th>
            <td>
              <span style={{ marginRight: "10px" }}>{currency.name}</span>(
              <span className="fw-bold">{currency.symbol}</span>)
            </td>
            <td className="fw-bold">{currency.quotes.USD.price.toFixed(2)} USD</td>

            <td className="d-flex flex-column ">
              {currency.quotes.USD.percent_change_24h < 0 ? (
                <span className="d-flex justify-content-center">
                  <FontAwesomeIcon
                    className="text-danger"
                    icon={faChevronDown}
                  />
                </span>
              ) : (
                <span className="d-flex justify-content-center">
                  <FontAwesomeIcon
                    className="text-success"
                    icon={faChevronUp}
                  />
                </span>
              )}

              {currency.quotes.USD.percent_change_24h}
            </td>
            <td>
              {currency.quotes.USD.percent_change_7d < 0 ? (
                <span className="d-flex justify-content-center">
                  <FontAwesomeIcon
                    className="text-danger"
                    icon={faChevronDown}
                  />
                </span>
              ) : (
                <span className="d-flex justify-content-center">
                  <FontAwesomeIcon
                    className="text-success "
                    icon={faChevronUp}
                  />
                </span>
              )}
              {currency.quotes.USD.percent_change_7d}
            </td>
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
