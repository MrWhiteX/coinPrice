import CryptoListHeader from "../CryptoList/CryptoListHeader";
import { useContext, useEffect } from "react";
import { CryptoContex } from "../../CryptoContex";

import CryptoRow from "../CryptoRow/CryptoRow";

const Favorites = () => {
  const { favouritesCrypto } = useContext(CryptoContex);

  return (
    <div className="container fs-5">
      <CryptoListHeader />
      <CryptoRow crypto={favouritesCrypto} />
    </div>
  );
};
export default Favorites;
