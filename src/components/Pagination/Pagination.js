import React from "react";

const Pagination = ({
  getPaginationGroup,
  cryptoPerPage,
  totalCrypto,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCrypto / cryptoPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (number, e) => {
    e.preventDefault();
    paginate(number);
  };

  const goToPreviousPage = () => {
    previousPage();
  };

  const goToNextPage = () => {
    nextPage();
  };

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
                <li key={number} className="page-item">
                  <a
                    href="!#"
                    className="page-link "
                    onClick={(e) => changePage(number, e)}
                  >
                    {number}
                  </a>
                </li>
              );
            })}
            <li className="page-item" onClick={goToNextPage}>
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <nav>
    //   <ul className="pagination">
    //     <li className="page-item">
    //       <a className="page-link" href="#" onClick={goToPreviousPage}>
    //         Previous
    //       </a>
    //     </li>
    //     {getPaginationGroup().map((number) => {
    //       return (
    //         <li key={number} className="page-item">
    //           <a
    //             href="!#"
    //             className="page-link "
    //             onClick={(e) => changePage(number, e)}
    //           >
    //             {number}
    //           </a>
    //         </li>
    //       );
    //     })}
    //     <li className="page-item">
    //       <a className="page-link" href="#" onClick={goToNextPage}>
    //         Next
    //       </a>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Pagination;
