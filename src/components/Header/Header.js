import React from "react";
import Navbar from "./Navbar";
import CryptoInfo from "../CryptoList/CryptoInfo";

const Header = () => {
  return (
    <header>
      <div className="container pt-5">
        <CryptoInfo />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
