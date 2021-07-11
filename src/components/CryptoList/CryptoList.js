import React, { useEffect, useState } from "react";
import { fetchCrypto } from "./Data/CryptoApi";
import CryptoRow from "./CryptoRow";
import Favourites from "../Favourites/Favourites";
import { BrowserRouter as Router, Route } from "react-router-dom";

const CryptoList = () => {
  const [crypto, setCrypto] = useState();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetchCrypto().then((data) => {
  //     setCrypto(Object.values(data));
  //     setLoading(true);
  //     console.log("ponowny render");
  //   });
  // }, []);

  useEffect(() => {
    fetchCrypto().then((data) => {
      setCrypto(Object.values(data));
      setLoading(true);
    });
    const intervalID = setInterval(() => {
      fetchCrypto().then((data) => {
        setCrypto(Object.values(data));
      });
    }, 3000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-borderless table-hover fs-5">
          <thead className="">
            <tr className="table-dark">
              <th scope="col">#</th>
              <th scope="col">Crypto</th>
              <th scope="col">Price</th>
              <th scope="col">24h</th>
              <th scope="col">7d</th>
              <th scope="col">Favourite</th>
            </tr>
          </thead>
          <tbody>
            {loading === false ? (
              <div
                class="spinner-border text-primary position-absolute end-50 mt-5"
                role="status"
              ></div>
            ) : (
              <CryptoRow crypto={crypto} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
