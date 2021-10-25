import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addCrypto,
  currentPaginationPage,
  getCryptoCopy,
  isSearchTerm,
} from "../../store/cryptoSlice";

const Searchbar = () => {
  const [term, setTerm] = useState("");
  const cryptoCopy = useSelector(getCryptoCopy);

  const dispatch = useDispatch();

  const search = (e) => {
    if (term === "") {
    } else {
      searchHandler(term);
      setTerm("");
    }
  };

  const searchHandler = (term) => {
    const filtredCrypto = [...cryptoCopy].filter(
      (x) =>
        x.symbol.toLowerCase().includes(term.toLowerCase()) ||
        x.name.toLowerCase().includes(term.toLowerCase())
    );
    dispatch(addCrypto(filtredCrypto));
    dispatch(isSearchTerm(true));
    dispatch(currentPaginationPage(1));
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
