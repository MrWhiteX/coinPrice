import React, { useState, useContext } from "react";
import { CryptoContex } from "../../CryptoContex";

const Searchbar = () => {
  const { searchHandler } = useContext(CryptoContex);
  const [term, setTerm] = useState("");

  const search = () => {
    searchHandler(term);
  };

  return (
    <div className="d-flex ">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && search()}
        type="text"
        className="form-control me-2"
        placeholder="Search"
        aria-label="Search"
      />

      <button className="btn btn-outline-primary" onClick={search}>
        Search
      </button>
    </div>
  );
};

export default Searchbar;
