import React, { useState, useContext } from "react";
import { CryptoContex } from "../../context/CryptoContex";
//import { useDispatch } from "react-redux";

const Searchbar = () => {
  const { searchHandler } = useContext(CryptoContex);
  const [term, setTerm] = useState("");
  //const dispatch = useDispatch();

  const search = (e) => {
    if (term === "") {
    } else {
      searchHandler(term);
      setTerm("");
    }

    //dispatch({ type: "redux-test" });
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
