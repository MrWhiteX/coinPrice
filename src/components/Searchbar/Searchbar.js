import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addSearchedCrypto,
  currentPaginationPage,
  getCryptoCopy,
  isSearchTerm,
} from "../../store/cryptoSlice";
import { Link, useHistory } from "react-router-dom";

const Searchbar = () => {
  const [term, setTerm] = useState("");
  const cryptoCopy = useSelector(getCryptoCopy);

  const history = useHistory();

  const dispatch = useDispatch();

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      search();
      history.push(`/search/${term}`);
    }
  };

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
    dispatch(addSearchedCrypto(filtredCrypto));
    dispatch(isSearchTerm(true));
    dispatch(currentPaginationPage(1));
  };

  return (
    <div className="d-flex ">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => onKeyDownHandler(e)}
        // onKeyDown={(e) => e.key === "Enter" && search()}
        type="text"
        className="form-control me-2"
        placeholder="Search"
        aria-label="Search"
      />

      <Link
        className={`btn btn-primary ${term === "" ? `disabled` : ``}`}
        to={`/search/${term}`}
        onClick={search}
      >
        Search
      </Link>
    </div>
  );
};

export default Searchbar;
