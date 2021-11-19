import { useState, useEffect } from "react";
import CryptoListHeader from "../components/CryptoList/CryptoListHeader";
import CryptoRow from "../components/CryptoRow/CryptoRow";
import useWebsiteTitle from "../hooks/useWebsiteTitle";
import { userAxios } from "../axios";
import useAuth from "../hooks/useAuth";
import { objectArrayWithId } from "../helpers/object";
import { useSelector } from "react-redux";
import { getCryptoFavId } from "../store/cryptoSlice";

const Favorites = () => {
  const [auth] = useAuth();
  const [favouritesCrypto, setFavouritesCrypto] = useState([]);

  useWebsiteTitle(`CoinPrice.pl - Favourites`);

  const cryptoFavId = useSelector(getCryptoFavId);

  const fetchFavCrypto = async () => {
    try {
      const res = await userAxios.get(`/favourites.json`);

      const newFav = objectArrayWithId(res.data).filter(
        (fav) => fav.user_id === auth.userId
      );
      setFavouritesCrypto(newFav.map((el) => el.currency));
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    fetchFavCrypto();
  }, [cryptoFavId]);

  return (
    <div className="container fs-5">
      <CryptoListHeader />
      <CryptoRow crypto={favouritesCrypto} />
    </div>
  );
};
export default Favorites;
