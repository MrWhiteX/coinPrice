import React from "react";
import Navbar from "./Navbar";
import CryptoInfo from "../CryptoList/CryptoInfo";
import CurrencyConventer from "../CurrencyConventer/CurrencyConventer";

const Header = () => {
  return (
    <header>
      <CurrencyConventer />
      <div className="container pt-5">
        <CryptoInfo />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
