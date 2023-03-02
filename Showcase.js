import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json"
import address from "../constants/address.json"




const Showcase = (props) => {

  const [counter, setCounter] = useState(5);

  
  const [account, setAccount] = useState("")
/* eslint-disable */
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
/* eslint-enable */

  const [contract, setContract] = useState(null)
/* eslint-disable */
  useEffect(() => {
    connectWallet()
  }, [])
/* eslint-enable */






const connectWallet = async () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
      if (!account) {
          // Only connect wallet if account is not set
          if (!(window.ethereum.networkVersion === "5")) {
              try {
                  await switchNetwork();
              } catch (err) {
                  console.log(err);
                  alert("Switch your network to Goerli and reload the page");
                  return;
              }
          }
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          if (accounts.length > 0) {
              accountChanged(accounts[0]);
          }
      }
  } else {
      alert("Please install Metamask");
  }
};

async function switchNetwork() {
  await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }], // chainId must be in HEX with 0x in front
  });
}

  const accountChanged = (newAcc) => {
    setAccount(newAcc)
    loadEthersProperties()
  }

  const loadEthersProperties = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner()
    setSigner(tempSigner)

    let tempContract = new ethers.Contract(address.address, abi, tempSigner)
    setContract(tempContract)
  }

  const mint = async () => {
    try {
      await contract.mint(counter, { value: ethers.utils.parseEther((counter * 0.002).toString()) })
     
    } catch (err) {
      alert(`A problem happened during mint.\n${err.reason === undefined ? err.message : err.reason}`)
    }
  }


     
    
  

  return (
    <section className="showcase">
      <div className="showcase-row">
        <div className="showcase-col">
        
        </div>
        <div className="showcase-col">
          <p className="showcase-col-desc">
          </p>
          <h2 className="showcase-col-sub-title">
 
            <span className="bold-text">  </span>
            <span className="bold-text"></span>
            <span className="bold-text"></span>
          </h2>
          <div className="mint-container">
            <div className="mint mint-1">
              <div className="mint-input">
                <button
                  onClick={() => {
                    setCounter(counter - 1);
                    if (counter <= 1) {
                      setCounter(1);
                    }
                  }}
                >
                  -
                </button>
                <span> {counter} </span>
                <button onClick={() => setCounter(counter + 1)}> + </button>
              </div>
              <button className="mint-button" onClick={mint}>Mint</button>
            </div>
          </div>
        
          
        </div>
      </div>

      <div id="background"></div>
    </section>
  );
};

export default Showcase;
