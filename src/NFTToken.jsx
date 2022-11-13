import abi from "./abis/src/contracts/NFTToken.sol/NFTToken.json";
import address from "./abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "./store";
import { ethers } from "ethers";

const { ethereum } = window;

const contractAddress = address.address;
const contractAbi = abi.abi;
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`;

const getEthereumContract = () => {
  const connectedAccount = getGlobalState("connectedAccount");
  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    //Account available for transaction
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask");

    //get all the account on metamask on the network
    const accounts = await ethereum.request({ method: "eth_accounts" });
    // metamask event reload the browser when we change network
    windows.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });
    //method enable you to connect to the account you changed
    window.ethereum.on("accountChanged", async () => {
      setGlobalState("connectedAccount", account[0]);
      await isWalletConnected();
    });
    //connect the account
    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      alert("Please connect to MetaMask");
      console.log("No account found");
    }
  } catch (error) {
    reportError(error);
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
    await isWalletConnected();
  } catch {
    reportError(error);
  }
};

const payToMint = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccounts = getGlobalState("connectedAccount");
    const contract = getEthereumContract();
    const amount = ethers.utils.parseEther("0.001");

    await contract.payToMint({
      from: connectedAccounts,
      value: amount._hex,
    });
  } catch (error) {
    window.location.reload();
    reportError(error);
  }
};

const loadNfts = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask");

    const contract = getEthereumContract();
    const nfts = await contract.getAllNfts();

    setGlobalState("nfts", structureNfts(nfts));
  } catch {
    reportError(error);
  }
};

const structureNfts = (nfts) =>
  nfts
    .map((nft) => ({
      id: Number(nft.id),
      url: opensea_uri + nft.id,
      buyer: nft.buyer,
      imageURL: nft.imageURL,
      cost: parseInt(nft.cost._hex) / 10 ** 18,
      timestamp: new Date(nft.timestamp.toNummber()).getTime(),
    }))
    .reverse();

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object");
};
export {};
