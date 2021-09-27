import CryptoListHeader from "../CryptoList/CryptoListHeader";
import { useContext, useEffect } from "react";
import { CryptoContex } from "../../CryptoContex";
import CryptoRow from "../CryptoList/CryptoRow";

const Favorites = () => {
  const { crypto, reloadComponentValue } = useContext(CryptoContex);

  useEffect(
    () =>
      console.log(
        "reloadComponentValuereloadComponentValue",
        reloadComponentValue
      ),
    [reloadComponentValue]
  );

  return (
    <div className="container fs-5">
      <CryptoListHeader />
      <CryptoRow crypto={crypto} />
    </div>
  );
};
export default Favorites;
