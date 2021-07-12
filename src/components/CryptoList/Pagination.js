import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

function Pagination({ data, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const handleFavouriteClick = (currency) => {
    const saveCurrencyToLocalStorage = currency;
    let dataFromLocalStorage = [];
    console.log("SAVECURRENCYID", saveCurrencyToLocalStorage.id);
    //console.log("DATAFROMLOCALID", dataFromLocalStorage)

    if (localStorage.getItem("favourite") != null) {
      dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
      const getCryptoId = dataFromLocalStorage.map((idcrypto) => {
        return idcrypto.id;
      });

      if (
        Object.values(getCryptoId).indexOf(saveCurrencyToLocalStorage.id) > -1
      ) {
        console.log("has test1");
      } else {
        console.log("moge dodac");
        dataFromLocalStorage.push(saveCurrencyToLocalStorage);
        localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));
      }
    } else {
      console.log("else");
      dataFromLocalStorage.push(saveCurrencyToLocalStorage);
      localStorage.setItem("favourite", JSON.stringify(dataFromLocalStorage));
    }
  };

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      {/* show the posts, 10 posts at a time */}

      {getPaginatedData().map((currency, idx) => (
        <tr key={idx}>
          <th className="" scope="row">
            {currency.rank}
          </th>
          <td>
            <span style={{ marginRight: "10px" }}>{currency.name}</span>(
            <span className="fw-bold">{currency.symbol}</span>)
          </td>
          <td className="fw-bold">
            {currency.quotes.USD.price.toFixed(2)} USD
          </td>

          <td className="d-flex flex-column ">
            {currency.quotes.USD.percent_change_24h < 0 ? (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-danger" icon={faChevronDown} />
              </span>
            ) : (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-success" icon={faChevronUp} />
              </span>
            )}

            {currency.quotes.USD.percent_change_24h}
          </td>
          <td>
            {currency.quotes.USD.percent_change_7d < 0 ? (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-danger" icon={faChevronDown} />
              </span>
            ) : (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-success " icon={faChevronUp} />
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
      ))}

      <div className="pagination position-absolute mt-5">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button key={index} onClick={changePage}>
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </>
  );
}

export default Pagination;
