import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import CryptoRowNew from "./CryptoRowNew";

function Pagination({ data, pageLimit, dataLimit, paginationInfo }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

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
        //key={currency.id}
        <CryptoRowNew key={currency.id} currency={currency} />
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
