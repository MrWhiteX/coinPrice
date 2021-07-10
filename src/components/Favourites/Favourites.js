import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Favourites = () => {
  const favouriteCrypto = JSON.parse(localStorage.getItem("favourite"));
  const handleRemoveFavourite = (currency, index) => {
     console.log(index);  
     const chuj = localStorage.getItem("favourite");
     console.log(chuj);
     favouriteCrypto.splice(index, 1);
     localStorage.setItem('favourite', JSON.stringify(favouriteCrypto))
     console.log(favouriteCrypto.length)
     

    if (favouriteCrypto.length === 0){
      localStorage.clear();

    }

  };




  
  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-borderless table-hover fs-5">
          <thead className="">
            <tr className="table-dark">
              <th scope="col">#</th>
              <th scope="col">Crypto</th>
              <th scope="col">Price</th>
              <th scope="col">24h</th>
              <th scope="col">7d</th>
              <th scope="col">Favourite</th>
            </tr>
          </thead>
          <tbody>
            {favouriteCrypto == null
              ? null
              : favouriteCrypto.map((currency, index) => {
                  return (
                    <tr key={currency.rank}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {currency.name}({currency.symbol})
                      </td>
                      <td>{currency.quotes.USD.price}</td>
                      <td>{currency.quotes.USD.percent_change_24h}</td>
                      <td>{currency.quotes.USD.percent_change_7d}</td>
                      <td>
                        <FontAwesomeIcon
                          className="text-danger"
                          icon={faStar}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveFavourite(currency, index)}
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {favouriteCrypto == null ? (
          <span className="mt-5 fs-5 d-flex justify-content-center text-danger fw-bold ">
            Brak polubionych walut
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Favourites;
