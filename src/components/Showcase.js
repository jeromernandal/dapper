import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json"
import address from "../constants/address.json"
import INFURA_ENDPOINT from "./config";
import Web3 from 'web3';
// eslint-disable-next-line
const provider = new ethers.providers.Web3Provider(new Web3.providers.HttpProvider(INFURA_ENDPOINT));

const Showcase = (props) => {

  const [counter, setCounter] = useState(5);

  /* eslint-disable */
  const [account, setAccount] = useState("")

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const [contract, setContract] = useState(null)

  useEffect(() => {
    connectWallet()
  }, [])
/* eslint-enable */






const connectWallet = async () => {
  if (window.ethereum) {
    if (!(window.ethereum.networkVersion === "5")) {
      alert("Switch your network to Mainnet")
      return
    }

    if (!account) { // Only connect wallet if account is not set
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
        if (res.length > 0) {
          accountChanged(res[0])
        } else {
          
        }
      })
    }

  } else {
    
  }
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
          </h2><br></br>
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
