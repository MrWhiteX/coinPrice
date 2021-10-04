const fetchCurrencies = (currencies = ["USD", "EUR"]) => {
  return fetch(`https://api.nbp.pl/api/exchangerates/tables/c/`)
    .then((response) => response.json())
    .then((data) => data[0].rates)
    .then((rates) => {
      return rates.reduce((memo, rate) => {
        if (currencies.includes(rate.code)) {
          return { ...memo, [rate.code]: rate };
        }
        return memo;
      });
    });
};

export default fetchCurrencies;
