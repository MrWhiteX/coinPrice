import axios from "axios";

const userAxios = axios.create({
  baseURL:
    "https://coinprice-86c3d-default-rtdb.europe-west1.firebasedatabase.app",
});

const cryptoAxios = axios.create({
  baseURL: "https://api.coinpaprika.com/v1",
});

const currencyAxios = axios.create({
  baseURL: "https://api.nbp.pl/api/exchangerates/tables",
});
export { userAxios, cryptoAxios, currencyAxios };
