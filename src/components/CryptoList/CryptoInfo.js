import { useEffect, useState } from "react";
import { fetchInfo } from "./Data/CryptoApi";

const CryptoInfo = () => {


const [info,setInfo] = useState();


useEffect(() => {
    fetchInfo().then((data) => {
    setInfo(data);
    console.log(data.id)
    });
  }, []);



return (
  <>
    { info ?  (
   
         <div className="row d-flex align-items-center fs-4 fs-sm-2 text-left">
         <div className="col-md-3">
           <a href="#">
           <img src="logo.jpeg" alt="" className="img-fluid" />
            </a>
              </div>
          <div className="col-md-3  ">
              <span className="">Market Cap</span>
            <p className="fw-bold">{info.market_cap_usd} $</p>
         </div>
         <div className="col-md-3 ">
         24h Vol:
     <p className="fw-bold">{info.volume_24h_usd} $</p>
 </div>
         <div className="col-md-3  ">
          BTC Dominance:
  <p className="fw-bold">{info.bitcoin_dominance_percentage} %</p>
     </div>
      </div>)  : 
      
      
      (
      
        <div className="row d-flex align-items-center fs-4 fs-sm-2 text-left">
        <div className="col-md-3">
          <a href="#">
          <img src="logo.jpeg" alt="" className="img-fluid" />
           </a>
             </div>
         <div className="col-md-3  ">
             <span className="">Market Cap</span>
           <p className="fw-bold">1348774765592 $</p>
        </div>
        <div className="col-md-3 ">
        24h Vol:
    <p className="fw-bold">114113885663 $</p>
</div>
        <div className="col-md-3  ">
         BTC Dominance:
 <p className="fw-bold">44.26 %</p>
    </div>
     </div>
      
      
      
      
      ) }

      </>            
);
         

};


export default CryptoInfo;