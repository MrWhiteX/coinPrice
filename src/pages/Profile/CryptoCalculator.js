import { useEffect, useState, useRef } from "react";
import { cryptoAxios } from "../../axios";

const CryptoCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [toSelect, setToSelect] = useState("usd-us-dollars");
  const [fromSelect, setFromSelect] = useState("btc-bitcoin");
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await cryptoAxios.get(`/price-converter`, {
          params: {
            base_currency_id: fromSelect,
            quote_currency_id: toSelect,
            amount: amount,
          },
        });
        setResult(res.data.price.toFixed(2));

        setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (ex) {
        console.log(ex.response);
      }
    }
    fetchData();
  }, [amount, toSelect, fromSelect]);

  return (
    <div>
      <h2 className="mt-md-3">Cryptocurrency Converter Calculator</h2>
      <div className="col-12 mt-5 d-flex align-items-center  justify-content-md-center flex-column flex-md-row">
        <div className="col-8 col-md-3">
          <input
            className="form-control "
            placeholder="Enter the amount"
            type="number"
            name=""
            id=""
            ref={inputRef}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <span className="fs-5 my-2 my-md-0 mt-md-0 mx-4"> From</span>
        <div className="">
          <select
            className="bg-white fs-5 text-center"
            aria-label=".form-select-sm example"
            style={{
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
            }}
            onChange={(e) => setFromSelect(e.target.value)}
          >
            <option value="btc-bitcoin" defaultValue={fromSelect}>
              BTC
            </option>
            <option value="eth-ethereum">ETH</option>
            <option value="bnb-binance-coin">BNB</option>
            <option value="sol-solana">SOL</option>
            <option value="ada-cardano">ADA</option>
            <option value="dot-polkadot">DOT</option>
            <option value="luna-terra">LUNA</option>
            <option value="trx-tron">TRON</option>
          </select>
        </div>
        <span className="fs-5 my-2 my-md-0 mt-md-0 mx-4">To </span>
        <div className="">
          <select
            className="bg-white fs-5 text-center"
            aria-label=".form-select-sm example"
            style={{
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
            }}
            onChange={(e) => setToSelect(e.target.value)}
          >
            <option value="usd-us-dollars" defaultValue={toSelect}>
              USD
            </option>
            <option value="eur-euro">EUR</option>
            <option value="pln-polish-zloty">PLN</option>
            <option value="gbp-pound-sterling">GBP</option>
            <option value="cad-canadian-dollar">CAD</option>
            <option value="jpy-japanese-yen">JPY</option>
            <option value="rub-russian-ruble">RUB</option>
            <option value="aud-australian-dollar">AUD</option>
            <option value="uah-ukrainian-hryvnia">UAH</option>
            <option value="czk-czech-koruna">CZK</option>
            <option value="nok-norwegian-krone">NOK</option>
          </select>
        </div>
      </div>
      <div className="col-12 mt-4 d-flex justify-content-center">
        <div className="fs-3">
          {loading ? (
            <>
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          ) : (
            <>
              Result:
              <span> {amount}</span>
              <span> {fromSelect.slice(0, 3).toLocaleUpperCase()} = </span>
              <span> {result}</span>
              <span> {toSelect.slice(0, 3).toUpperCase()}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;
