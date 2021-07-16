import React, { createContext, useState, useEffect } from "react";
import { fetchCrypto } from "./components/CryptoList/Data/CryptoApi";

export const CryptoContex = createContext();

function CryptoContexProvider({ children }) {
  const [crypto, setCrypto] = useState();
  const [cryptoCopy, setcryptoCopy] = useState();
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
    }, 113000);

    return () => clearInterval(intervalID);
  }, []);

  const searchHandler = (term) => {
    const filtredCrypto = [...cryptoCopy].filter(
      (x) =>
        x.symbol.toLowerCase().includes(term.toLowerCase()) ||
        x.name.toLowerCase().includes(term.toLowerCase())
    );
    setCrypto(filtredCrypto);

    console.log(filtredCrypto);
  };

  return (
    <CryptoContex.Provider value={{ crypto, loading, searchHandler }}>
      {children}
    </CryptoContex.Provider>
  );
}

export default CryptoContexProvider;
