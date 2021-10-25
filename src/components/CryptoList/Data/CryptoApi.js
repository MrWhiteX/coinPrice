import { cryptoAxios } from "../../../axios";

const fetchCrypto = async () => {
  try {
    const res = await cryptoAxios.get("/tickers");
    return res.data;
  } catch (ex) {
    console.log(ex.response);
  }
};

const fetchInfo = async () => {
  try {
    const res = await cryptoAxios.get("/global");
    return res.data;
  } catch (ex) {
    console.log(ex.response);
  }
};

export { fetchCrypto, fetchInfo };
