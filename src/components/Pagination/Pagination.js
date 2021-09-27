import React from "react";

const Pagination = ({ cryptoPerPage, totalCrypto, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCrypto / cryptoPerPage); i++) {
    pageNumbers.push(i);
  }

  const onClickHandler = (number, e) => {
    e.preventDefault();
    paginate(number);
  };

  return (
    <nav className="pagination d-flex flex-wrap">
      {pageNumbers.map((number) => {
        return (
          <li key={number} className=" ">
            <a
              href="!#"
              className="page-link d-flex flex-wrap"
              onClick={(e) => onClickHandler(number, e)}
            >
              {number}
            </a>
          </li>
        );
      })}
    </nav>
  );
};

export default Pagination;
