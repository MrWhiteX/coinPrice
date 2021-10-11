import { useContext } from "react";
import { ConvertContex } from "../../context/ConvertContext";

const CurrencyConventer = () => {
  const { changeCurrency } = useContext(ConvertContex);

  const changeCurrencyHandler = (e) => {
    changeCurrency(e);
  };

  return (
    <>
      <div className="container col-12">
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
