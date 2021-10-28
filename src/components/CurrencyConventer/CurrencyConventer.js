import { useEffect } from "react";
import { currencyAxios } from "../../axios";
import { useDispatch } from "react-redux";
import {
  currency,
  getCurrency,
  setActualCurrency,
} from "../../store/cryptoSlice";
import { useSelector } from "react-redux";

const CurrencyConventer = () => {
  const dispatch = useDispatch();

  const changeCurrencyHandler = (e) => {
    dispatch(setActualCurrency(e.target.value));
  };

  const currencyValue = useSelector(getCurrency);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await currencyAxios.get("/c");

        const usdValue = response.data[0].rates[0].ask.toFixed(2);
        const eurValue = response.data[0].rates[3].ask.toFixed(2);
        dispatch(
          currency({
            USD: usdValue,
            EUR: eurValue,
          })
        );
      } catch (ex) {
        console.log(ex.response);
      }
    };

    fetchCurrency();
  }, []);

  return (
    <>
      <div className="container-fluid col-12">
        <div className="d-flex justify-content-end">
          <div className="mt-3">
            <select
              className="form-select"
              onChange={(e) => changeCurrencyHandler(e)}
            >
              <option value="USD">USD</option>
              <option value="PLN">PLN</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConventer;
