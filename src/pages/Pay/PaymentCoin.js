import React from "react";
import { ethers } from "ethers";

const PaymentCoin = () => {
  return (
    <div className="cursor-pointer checkout-method flex-1 p-2 flex items-center justify-center bg-blue-400">
      <div className="w-[60px] h-[60px] mx-auto pointer-events-none">
        <img
          className="w-full h-full object-cover"
          src="https://png.pngtree.com/png-clipart/20210211/ourmid/pngtree-glossy-golden-coin-icon-png-image_2898883.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default PaymentCoin;
