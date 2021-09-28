import React, { createContext, useState, useEffect } from "react";
import { fetchCrypto } from "./components/CryptoList/Data/CryptoApi";

export const CryptoContex = createContext();

function CryptoContexProvider({ children }) {
  const [crypto, setCrypto] = useState([]);
  const [cryptoCopy, setcryptoCopy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadComponentValue, setReloadComponentValue] = useState(false);
  const [isSearchTerm, setIsSearchTerm] = useState(false);

  const loadingHandler = () => {
    setCrypto(false);
  };

  useEffect(() => {
    fetchCrypto().then((data) => {
      setCrypto(data);
      setcryptoCopy(data);
      setLoading(true);
    });
    const intervalID = setInterval(() => {
      fetchCrypto().then((data) => {
        setCrypto(Object.values(data));
      });
    }, 114000);

    return () => clearInterval(intervalID);
  }, []);

  const searchHandler = (term) => {
    const filtredCrypto = [...cryptoCopy].filter(
      (x) =>
        x.symbol.toLowerCase().includes(term.toLowerCase()) ||
        x.name.toLowerCase().includes(term.toLowerCase())
    );
    setCrypto(filtredCrypto);
    setIsSearchTerm(true);
  };

  const top10Handler = () => {
    setCrypto(cryptoCopy);
  };

  const reloadComponent = () => {
    setReloadComponentValue(!reloadComponentValue);
  };

  const getFavorites = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
    const favoritesCrypto = [];

    dataFromLocalStorage.forEach((element) => {
      cryptoCopy.filter((item) => {
        if (item.id === element.id) {
          favoritesCrypto.push(item);
        }
        return true;
      });
    });

    setCrypto(favoritesCrypto);
  };
  return (
    <CryptoContex.Provider
      value={{
        crypto,
        loading,
        searchHandler,
        getFavorites,
        top10Handler,
        reloadComponent,
        reloadComponentValue,
        isSearchTerm,
      }}
    >
      {children}
    </CryptoContex.Provider>
  );
}

export default CryptoContexProvider;
