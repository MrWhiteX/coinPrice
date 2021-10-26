import React, { createContext, useState, useEffect } from "react";
// import { fetchCrypto } from "../components/CryptoList/Data/CryptoApi";

export const CryptoContex = createContext();

function CryptoContexProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [crypto, setCrypto] = useState([]);
  const [cryptoCopy, setcryptoCopy] = useState([]);
  const [favouritesCrypto, setFavouritesCrypto] = useState([]);

  const [loading, setLoading] = useState(false);
  const [reloadComponentValue, setReloadComponentValue] = useState(false);
  const [isSearchTerm, setIsSearchTerm] = useState(false);

  useEffect(() => {
    getFavorites();
  }, [crypto]);

  // useEffect(() => {
  //   fetchCrypto().then((data) => {
  //     setCrypto(data);
  //     setcryptoCopy(data);
  //     setLoading(true);
  //   });

  //   const intervalID = setInterval(() => {
  //     fetchCrypto().then((data) => {
  //       setCrypto(Object.values(data));
  //     });
  //   }, 114000);

  //   return () => clearInterval(intervalID);
  // }, []);

  // const searchHandler = (term) => {
  //   const filtredCrypto = [...cryptoCopy].filter(
  //     (x) =>
  //       x.symbol.toLowerCase().includes(term.toLowerCase()) ||
  //       x.name.toLowerCase().includes(term.toLowerCase())
  //   );
  //   setCrypto(filtredCrypto);
  //   setIsSearchTerm(true);
  //   setCurrentPage(1);
  // };

  const top10Handler = () => {
    setCrypto(cryptoCopy);
    setCurrentPage(1);
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

  // Change page in pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Previous page btn in pagination
  const previousPage = () => {
    if (currentPage >= 2) {
      setCurrentPage((pageNumber) => pageNumber - 1);
    }
  };

  // Next page btn
  const nextPage = () => {
    // if (currentPage !== crypto.length) {
    //   setCurrentPage((pageNumber) => pageNumber + 1);
    // }
    setCurrentPage((pageNumber) => pageNumber + 1);
  };

  return (
    <CryptoContex.Provider
      value={{
        // crypto,
        // loading,
        favouritesCrypto,
        // searchHandler,
        getFavorites,
        // top10Handler,
        // reloadComponent,
        // reloadComponentValue,
        // isSearchTerm,
        // currentPage,
        // paginate,
        // previousPage,
        // nextPage,
      }}
    >
      {children}
    </CryptoContex.Provider>
  );
}

export default CryptoContexProvider;
