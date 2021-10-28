import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  currentPaginationPage,
  getAllCrypto,
  getCurrentPaginationPage,
  getIsSearchTerm,
} from "../../store/cryptoSlice";

const Pagination = ({ cryptoPerPage, changeCryptoPerPage }) => {
  const [changeRows, setChangeRows] = useState(20);
  const [pageLimit, setPageLimit] = useState(5);

  const dispatch = useDispatch();

  const crypto = useSelector(getAllCrypto);
  const currentPage = useSelector(getCurrentPaginationPage);
  const pageNumber = useSelector(getCurrentPaginationPage);
  const isSearchTerm = useSelector(getIsSearchTerm);

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  console.log(getPaginationGroup());

  useEffect(() => {
    if (isSearchTerm) {
      setPageLimit(Math.ceil(crypto.length / 10));
    } else {
      setPageLimit(5);
    }
  }, [crypto]);

  const changePage = (number, e) => {
    e.preventDefault();
    // paginate(number);
    dispatch(currentPaginationPage(number));
  };

  const goToPreviousPage = () => {
    if (currentPage >= 2) {
      const page = pageNumber - 1;
      dispatch(currentPaginationPage(page));
    }
  };

  const goToNextPage = (e) => {
    if (e.target.className === "page-link") {
      const page = pageNumber + 1;
      dispatch(currentPaginationPage(page));
    }
  };

  const disabledPaginationRule = Math.ceil(crypto.length / 10);

  const showRowsHandler = (e) => {
    changeCryptoPerPage(e.target.value);
    setChangeRows(e.target.value);
  };

  return (
    <>
      <div className="row mt-3">
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
      <div style={{ height: "120px" }}>
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
