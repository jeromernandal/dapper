import React, { useState, useEffect } from "react";
import { ethers } from "ethers";




const Wallet = () => {
  // eslint-disable-next-line
  const [account, setAccount] = useState("");
  // eslint-disable-next-line
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      if (!(window.ethereum.networkVersion === "5")) {
        alert("Switch your network to Mainnet")
        return
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    if (account) {
      return;
    }
  
    connectWallet();
  }, [account]);
  
  /* eslint-disable */

  return (
    <div className="wallet">
      {account ? (
        <div>
          
          
        
        </div>
      ) : (
        <button onClick={connectWallet}></button>
      )}
    </div>
  );
};
/* eslint-enable */
export default Wallet;
