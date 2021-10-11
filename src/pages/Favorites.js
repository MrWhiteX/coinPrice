import CryptoListHeader from "../components/CryptoList/CryptoListHeader";
import { useContext } from "react";
import { CryptoContex } from "../context/CryptoContex";
import CryptoRow from "../components/CryptoRow/CryptoRow";
import useWebsiteTitle from "../hooks/useWebsiteTitle";

const Favorites = () => {
  const { favouritesCrypto } = useContext(CryptoContex);
  useWebsiteTitle(`CoinPrice.pl - Favourites`);

  return (
    <div className="container fs-5">
      <CryptoListHeader />
      <CryptoRow crypto={favouritesCrypto} />
    </div>
  );
};
export default Favorites;
