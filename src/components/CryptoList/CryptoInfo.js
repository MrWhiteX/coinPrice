import React from "react";
import { useEffect, useState, useContext } from "react";
import { fetchInfo } from "./Data/CryptoApi";
import { ConvertContex } from "../../context/ConvertContext";

const CryptoInfo = () => {
  const [info, setInfo] = useState("Wczytywanie danych");
  const [infoLoading, setInfoLoading] = useState(false);
  const { dataCurrency, actualCurrency } = useContext(ConvertContex);

  useEffect(() => {
    setInfoLoading(true);
  }, []);

  useEffect(() => {
    fetchInfo().then((data) => {
      setInfo(data);
    });

    const intervalID = setInterval(() => {
      fetchInfo().then((data) => {
        setInfo(data);
      });
    }, 114000);

    return () => clearInterval(intervalID);
  }, [infoLoading]);

  return (
    <>
      <div className="row d-flex align-items-center fs-4 fs-sm-2 text-left">
        <div className="col-md-3">
          <img src="../logo.jpeg" alt="" className="img-fluid"></img>
        </div>
        <div className="col-md-3  ">
          <span className="">Market Cap</span>
          <p className="fw-bold">
            {actualCurrency === "USD"
              ? `${info.market_cap_usd} $`
              : `${info.market_cap_usd * dataCurrency.USD} PLN`}
          </p>
        </div>
        <div className="col-md-3 ">
          24h Vol:
          <p className="fw-bold">
            {actualCurrency === "USD"
              ? `${info.volume_24h_usd} $`
              : `${info.volume_24h_usd * dataCurrency.USD} PLN`}
          </p>
        </div>
        <div className="col-md-3  ">
          BTC Dominance:
          <p className="fw-bold">{info.bitcoin_dominance_percentage} %</p>
        </div>
      </div>
    </>
  );
};

export default CryptoInfo;
