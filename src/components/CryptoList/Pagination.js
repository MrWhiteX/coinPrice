import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

function Pagination({ data, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const [isFav, setIsFav] = useState(true);
  const idCryptoFav = [];

  useEffect(() => {}, [isFav]);
  const localData = JSON.parse(localStorage.getItem("favourite"));

  function getIdFromLocalStorage() {
    if (localData != null) {
      localData.map((item) => {
        idCryptoFav.push(item.id);
      });
    }
  }

  function checkIdAlreadyExist(currency) {
    if (idCryptoFav.includes(currency.id)) {
      const indx = idCryptoFav.indexOf(currency.id);
      localData.splice(indx, 1);
      localStorage.setItem("favourite", JSON.stringify(localData));
    }
  }

  getIdFromLocalStorage();

  const handleFavouriteClick = (currency, index) => {
    setIsFav(!isFav);
    const saveCurrencyToLocalStorage = currency;
    let dataFromLocalStorage = [];

    if (localStorage.getItem("favourite") != null) {
      dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
      const getCryptoId = dataFromLocalStorage.map((idcrypto) => {
        return idcrypto.id;
      });

      if (
        Object.values(getCryptoId).indexOf(saveCurrencyToLocalStorage.id) > -1
      ) {
        console.log("has test1");
        checkIdAlreadyExist(currency);
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
        <div
          key={currency.id}
          className="row mb-4 mb-md-0 border-bottom border-bottom-sm-0"
        >
          <div className="col-1 col-sm-1 fw-bold">{currency.rank}</div>

          <div className="col-6 col-sm-4">
            <span className="d-flex justify-content-start">
              <b>{currency.name} </b>
              <span style={{ marginLeft: "10px" }}>({currency.symbol})</span>
            </span>
          </div>

          <div className="col-5 col-sm-2">
            <span className="d-flex justify-content-end fw-bold">
              {currency.quotes.USD.price.toFixed(2)} USD
            </span>
          </div>

          <div className="offset-1 offset-sm-1 col-4 col-sm-1">
            {currency.quotes.USD.percent_change_24h < 0 ? (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-danger" icon={faChevronDown} />
              </span>
            ) : (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-success" icon={faChevronUp} />
              </span>
            )}

            <span className="fw-bold">
              {currency.quotes.USD.percent_change_24h}
            </span>

            <sup className="d-sm-none"> 24h</sup>
          </div>

          <div className="col-4 col-sm-2">
            {currency.quotes.USD.percent_change_7d < 0 ? (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-danger" icon={faChevronDown} />
              </span>
            ) : (
              <span className="d-flex justify-content-center">
                <FontAwesomeIcon className="text-success " icon={faChevronUp} />
              </span>
            )}

            <span className="fw-bold">
              {currency.quotes.USD.percent_change_7d}
            </span>

            <sup className="d-sm-none"> 7d</sup>
          </div>

          <div className="offset-2 offset-sm-0 col-1 col-sm-1 d-flex justify-content-center align-items-center">
            <FontAwesomeIcon
              className="text-danger"
              icon={idCryptoFav.includes(currency.id) ? faStarSolid : faStar}
              style={{ cursor: "pointer" }}
              onClick={() => handleFavouriteClick(currency, idx)}
            />
          </div>
        </div>
      ))}

      <div className="row">
        <div className="col-12 d-flex justify-content-center ">
          <div className="pagination mt-2 mb-5">
            {/* previous button */}
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? "disabled" : ""} fw-bold`}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="xs" />
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : null
                } `}
              >
                <span>{item}</span>
              </button>
            ))}

            {/* next button */}
            <button
              onClick={goToNextPage}
              className={`next ${
                currentPage === pages ? "disabled" : ""
              } fw-bold`}
            >
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
