import React, { createContext, useState, useEffect } from "react";
import { fetchCrypto } from "./components/CryptoList/Data/CryptoApi";

export const CryptoContex = createContext();

function CryptoContexProvider({ children }) {
  const [crypto, setCrypto] = useState([]);
  const [cryptoCopy, setcryptoCopy] = useState([]);
  const [favouritesCrypto, setFavouritesCrypto] = useState([]);

  const [loading, setLoading] = useState(false);
  const [reloadComponentValue, setReloadComponentValue] = useState(false);
  const [isSearchTerm, setIsSearchTerm] = useState(false);

  useEffect(() => {
    console.log("KRYPTOOOOOOOOOOOOOOO SIE ZMIENILO", crypto);
    getFavorites();
  }, [crypto]);

  useEffect(() => {
    console.log("WYKONAŁAM SIĘ useEffect");
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
    setIsSearchTerm(false);
  };

  const reloadComponent = () => {
    setReloadComponentValue(!reloadComponentValue);
  };

  const getFavorites = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("favourite"));
    const favoritesCryptos = [];

    if (dataFromLocalStorage != null) {
      dataFromLocalStorage.forEach((element) => {
        console.log("element", element);
        console.log("cryptoCopy", cryptoCopy);
        crypto.filter((item) => {
          if (item.id === element.id) {
            favoritesCryptos.push(item);
            console.log(item);
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
        crypto,
        loading,
        favouritesCrypto,
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
