import React, { createContext, useState, useEffect } from "react";
// import { fetchCrypto } from "../components/CryptoList/Data/CryptoApi";

export const CryptoContex = createContext();

function CryptoContexProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [crypto, setCrypto] = useState([]);
  const [cryptoCopy, setcryptoCopy] = useState([]);
  const [favouritesCrypto, setFavouritesCrypto] = useState([]);

  useEffect(() => {
    getFavorites();
  }, [crypto]);

  const getFavorites = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
    const favoritesCryptos = [];

    if (dataFromLocalStorage != null) {
      dataFromLocalStorage.forEach((element) => {
        crypto.filter((item) => {
          if (item.id === element.id) {
            favoritesCryptos.push(item);
          }
          //  return true;
        });
      });

      setFavouritesCrypto(favoritesCryptos);
    }
  };

  return (
    <CryptoContex.Provider
      value={{
        favouritesCrypto,
        getFavorites,
      }}
    >
      {children}
    </CryptoContex.Provider>
  );
}

export default CryptoContexProvider;
