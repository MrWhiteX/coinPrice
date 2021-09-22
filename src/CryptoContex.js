import React, { createContext, useState, useEffect } from "react";
import { fetchCrypto } from "./components/CryptoList/Data/CryptoApi";

export const CryptoContex = createContext();

function CryptoContexProvider({ children }) {
  const [crypto, setCrypto] = useState([]);
  const [cryptoCopy, setcryptoCopy] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    unlimited: false,
    favsite: false,
  });
  const [loading, setLoading] = useState(false);

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
  };

  const top10Handler = () => {
    setCrypto(cryptoCopy);
    setPaginationInfo({ favsite: false, unlimited: false });
  };

  const getFavorites = () => {
    setPaginationInfo(true);
    setPaginationInfo({ favsite: true, unlimited: 128 });

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
        paginationInfo,
      }}
    >
      {children}
    </CryptoContex.Provider>
  );
}

export default CryptoContexProvider;
