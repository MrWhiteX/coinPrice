import React, { createContext, useState, useEffect } from "react";
import fetchCurrencies from "../components/CurrencyConventer/data/NBPApi";

export const ConvertContex = createContext();

function ConvertContexProvider({ children }) {
  const [actualCurrency, setActualCurrency] = useState("USD");
  const [dataCurrency, setDataCurrency] = useState([
    {
      USD: 0,
      EUR: 0,
    },
  ]);
  useEffect(() => {
    fetchCurrencies()
      .then((currencies) => {
        setDataCurrency((prevState) => {
          return {
            ...prevState,
            USD: currencies.ask.toFixed(2),
            EUR: currencies.EUR.ask.toFixed(2),
          };
        });
      })
      .catch((err) => {
        console.log("Błąd!", err);
      });
  }, []);

  const changeCurrency = (e) => {
    setActualCurrency(e.target.value);
  };

  return (
    <ConvertContex.Provider
      value={{
        actualCurrency,
        changeCurrency,
        dataCurrency,
      }}
    >
      {children}
    </ConvertContex.Provider>
  );
}

export default ConvertContexProvider;
