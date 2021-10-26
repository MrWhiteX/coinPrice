import React from "react";
import { useEffect, useState } from "react";
import { cryptoAxios } from "../../axios";
import { useSelector } from "react-redux";
import { getActualCurrency, getCurrency } from "../../store/cryptoSlice";

const CryptoInfo = () => {
  const [info, setInfo] = useState("Wczytywanie danych");
  const [infoLoading, setInfoLoading] = useState(false);

  const dataCurrency = useSelector(getCurrency);
  const actualCurrency = useSelector(getActualCurrency);

  useEffect(() => {
    setInfoLoading(true);
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await cryptoAxios.get("/global");
        setInfo(response.data);
      } catch (ex) {
        console.log(ex.response);
      }
    };

    fetchInfo();

    const intervalID = setInterval(() => {
      fetchInfo();
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
