import React from "react";

const Pagination = ({
  getPaginationGroup,
  cryptoPerPage,
  totalCrypto,
  paginate,
  previousPage,
  nextPage,
  currentPage,
  crypto,
}) => {
  // const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(totalCrypto / cryptoPerPage); i++) {
  //   pageNumbers.push(i);
  // }

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

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
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
  );
};

export default Pagination;
