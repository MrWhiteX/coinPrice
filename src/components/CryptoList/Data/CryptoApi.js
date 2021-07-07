const fetchCrypto = () => {
  return fetch(`https://api.coinpaprika.com/v1/tickers`)
    .then((response) => response.json())
    .then((data) => {
      return data.filter((el) => {
        if (el.rank <= 10) {
          return el;
        }
      });
    });
};

export default fetchCrypto;
