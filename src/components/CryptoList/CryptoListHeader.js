const CryptoListHeader = () => (
  <div className="nice-dark">
    <div className="row mb-2">
      <div className="col-1 col-sm-1">
        <span className="text-white fs-5 fw-bold">#</span>
      </div>

      <div className="col-7 col-sm-4">
        <span className="text-white fs-5 fw-bold d-flex justify-content-start">
          Crypto
        </span>
      </div>

      <div className="col-4 col-sm-2">
        <span className="text-white fs-5 fw-bold d-flex justify-content-end">
          Price
        </span>
      </div>

      <div className="offset-1 offset-sm-1 col-4 col-sm-1">
        <span
          //   onClick={sortFn}
          className="d-none d-sm-block text-white fs-5 fw-bold"
        >
          24h
        </span>
      </div>

      <div className="col-3 col-sm-2">
        <span className="d-none d-sm-block text-white fs-5 fw-bold">7d</span>
      </div>

      <div className="col-1 col-sm-1 d-flex align-items-center">
        <span className="d-none d-sm-block text-white fs-5 fw-bold">
          Favorites
        </span>
      </div>
    </div>
  </div>
);

export default CryptoListHeader;
