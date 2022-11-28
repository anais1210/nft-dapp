import ethlogo from "../assets/ethlogo.png";
import { connectWallet } from "../NFTToken";
import { truncate, useGlobalState } from "../store";

const Header = () => {
  //call the global state connectedAccount
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <nav className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
      <div className="flex flex-row justify-start items-center md:flex-[0.5] flex-initial">
        <img className="w-8 cursor-pointer" src={ethlogo} alt="logo" />
        <span className="text-white text-2xl ml-2">NFT dApp</span>
      </div>
      <ul className="md:flex md:flex[0.5] text-white list-none flex-row justify-between items-center flex-initial">
        {/* <li className="mx-4 cursors-pointer">Explore</li>
        <li className="mx-4 cursors-pointer">Feature</li>
        <li className="mx-4 cursors-pointer">Community</li> */}
      </ul>
      {connectedAccount ? (
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg[#bd255f] md:text-xs p-2 rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          {truncate(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg[#bd255f] md:text-xs p-2 rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Header;
