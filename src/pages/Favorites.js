/* eslint-disable array-callback-return */
// eslint-disable-next-line array-callback-return
import { useEffect, useState } from "react";
import CryptoListHeader from "../components/CryptoList/CryptoListHeader";
import CryptoRow from "../components/CryptoRow/CryptoRow";
import useWebsiteTitle from "../hooks/useWebsiteTitle";
import { useSelector } from "react-redux";
import { getAllCrypto, getCryptoFav } from "../store/cryptoSlice";

const Favorites = () => {
  const [refreshFav, setRefreshFav] = useState([]);
  useWebsiteTitle(`CoinPrice.pl - Favourites`);

  const cryptoFav = useSelector(getCryptoFav);
  const crypto = useSelector(getAllCrypto);

  useEffect(() => {
    let refreshFavCrypto = [];
    setRefreshFav(refreshFavCrypto);

    crypto.map((allCrypto) => {
      cryptoFav.map((fav) => {
        if (allCrypto.id === fav.id) {
          refreshFavCrypto.push({
            beta_value: allCrypto.beta_value,
            circulating_supply: allCrypto.circulating_supply,
            first_data_at: allCrypto.first_data_at,
            id: allCrypto.id,
            last_updated: allCrypto.last_updated,
            max_supply: allCrypto.max_supply,
            name: allCrypto.name,
            quotes: {
              USD: {
                ath_date: allCrypto.quotes.USD.ath_date,
                ath_price: allCrypto.quotes.USD.ath_price,
                market_cap: allCrypto.quotes.USD.market_cap,
                market_cap_change_24h:
                  allCrypto.quotes.USD.market_cap_change_24h,
                percent_change_1h: allCrypto.quotes.USD.percent_change_1h,
                percent_change_1y: allCrypto.quotes.USD.percent_change_1y,
                percent_change_6h: allCrypto.quotes.USD.percent_change_6h,
                percent_change_7d: allCrypto.quotes.USD.percent_change_7d,
                percent_change_12h: allCrypto.quotes.USD.percent_change_12h,
                percent_change_15m: allCrypto.quotes.USD.percent_change_15m,
                percent_change_24h: allCrypto.quotes.USD.percent_change_24h,
                percent_change_30d: allCrypto.quotes.USD.percent_change_30d,
                percent_change_30m: allCrypto.quotes.USD.percent_change_30m,
                percent_from_price_ath:
                  allCrypto.quotes.USD.percent_from_price_ath,
                price: allCrypto.quotes.USD.price,
                volume_24h: allCrypto.quotes.USD.volume_24h,
                volume_24h_change_24h:
                  allCrypto.quotes.USD.volume_24h_change_24h,
              },
            },
            rank: allCrypto.rank,
            symbol: allCrypto.symbol,
            total_supply: allCrypto.total_supply,
          });
        }
      });
    });
  }, [cryptoFav, crypto]);

  return (
    <div className="container fs-5">
      <CryptoListHeader />
      <CryptoRow crypto={refreshFav} />
    </div>
  );
};
export default Favorites;
