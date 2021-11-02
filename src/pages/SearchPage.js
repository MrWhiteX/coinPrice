import CryptoListHeader from "../components/CryptoList/CryptoListHeader";
import CryptoRow from "../components/CryptoRow/CryptoRow";
import useWebsiteTitle from "../hooks/useWebsiteTitle";
import { getSearchedCrypto } from "../store/cryptoSlice";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const crypto = useSelector(getSearchedCrypto);

  useWebsiteTitle(`CoinPrice.pl - Search`);

  return (
    <div className="container fs-5">
      <CryptoListHeader />
      <CryptoRow crypto={crypto} />
    </div>
  );
};
export default SearchPage;
