import React, { useState, useEffect, useContext } from "react";
import { CryptoContex } from "../../context/CryptoContex";

const Pagination = ({ cryptoPerPage, changeCryptoPerPage }) => {
  const [changeRows, setChangeRows] = useState(20);
  const [pageLimit, setPageLimit] = useState(5);
  const {
    currentPage,
    paginate,
    previousPage,
    nextPage,
    crypto,
    isSearchTerm,
  } = useContext(CryptoContex);

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    if (isSearchTerm) {
      setPageLimit(Math.ceil(crypto.length / 10));
    } else {
      setPageLimit(5);
    }
  }, [crypto]);

  const changePage = (number, e) => {
    e.preventDefault();
    paginate(number);
  };

  const goToPreviousPage = () => {
    previousPage();
  };

  const goToNextPage = (e) => {
    if (e.target.className === "page-link") {
      nextPage();
    }
  };

  const disabledPaginationRule = Math.ceil(crypto.length / 10);

  const showRowsHandler = (e) => {
    changeCryptoPerPage(e.target.value);
    setChangeRows(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center ">
          <div className="pagination mt-5 mb-5">
            <ul className="pagination">
              <li className="page-item" onClick={goToPreviousPage}>
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              {getPaginationGroup().map((number) => {
                return (
                  <li
                    key={number}
                    className={`page-item ${
                      currentPage === number ? `active` : null
                    }`}
                  >
                    <a
                      href="!#"
                      className="page-link"
                      onClick={(e) => changePage(number, e)}
                    >
                      {number}
                    </a>
                  </li>
                );
              })}
              <li
                className={`page-item ${
                  currentPage === disabledPaginationRule ? `disabled` : null
                } `}
                onClick={(e) => goToNextPage(e)}
              >
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ height: "200px" }}>
        <div
          className={`d-none ${
            isSearchTerm ? `d-md-none` : `d-md-flex`
          } justify-content-end align-items-center flex-row mt-3`}
        >
          Show rows:
          <div className="ms-3">
            <select
              value={cryptoPerPage}
              onChange={(e) => showRowsHandler(e)}
              className="form-select"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
