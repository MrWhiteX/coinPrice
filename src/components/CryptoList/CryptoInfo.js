import React from "react";
import { useEffect, useState } from "react";
import { cryptoAxios } from "../../axios";
import { useSelector } from "react-redux";
import { getActualCurrency, getCurrency } from "../../store/cryptoSlice";
import millify from "millify";

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
          <span className="fw-bold">Market Cap </span>
          <span className="">
            {actualCurrency === "USD"
              ? `${millify(info.market_cap_usd ? info.market_cap_usd : 0, {
                  units: ["B", "KB", "MB", "M", "T"],
                  space: true,
                })} USD`
              : `${millify(
                  info.market_cap_usd
                    ? info.market_cap_usd * dataCurrency.USD
                    : 0,
                  {
                    units: ["B", "KB", "MB", "M", "T"],
                    space: true,
                  }
                )} PLN`}
          </span>
        </div>
        <div className="col-md-3 ">
          <span className="fw-bold"> 24h Vol </span>
          <span className="">
            {actualCurrency === "USD"
              ? `${millify(info.volume_24h_usd ? info.volume_24h_usd : 0, {
                  units: ["B", "KB", "MB", "M", "T"],
                  space: true,
                })} USD`
              : `${millify(
                  info.volume_24h_usd
                    ? info.volume_24h_usd * dataCurrency.USD
                    : 0,
                  {
                    units: ["B", "KB", "MB", "M", "T"],
                    space: true,
                  }
                )} PLN`}
          </span>
        </div>
        <div className="col-md-3  ">
          <span className="fw-bold"> BTC Dominance </span>
          <span className="">{info.bitcoin_dominance_percentage} %</span>
        </div>
      </div>
    </>
  );
};

export default CryptoInfo;
