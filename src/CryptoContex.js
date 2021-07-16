import React, { createContext, useState, useEffect } from "react";
import { fetchCrypto } from "./components/CryptoList/Data/CryptoApi";

export const CryptoContex = createContext();

function CryptoContexProvider({ children }) {
  const [crypto, setCrypto] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCrypto().then((data) => {
      setCrypto(data);
      setLoading(true);
    });
    const intervalID = setInterval(() => {
      fetchCrypto().then((data) => {
        setCrypto(Object.values(data));
      });
    }, 113000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <CryptoContex.Provider value={{ crypto, loading }}>
      {children}
    </CryptoContex.Provider>
  );
}

export default CryptoContexProvider;
