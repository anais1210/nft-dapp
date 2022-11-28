import { payToMint } from "../NFTToken";
import { setAlert, setGlobalState, useGlobalState } from "../store";

const Hero = () => {
  const [nfts] = useGlobalState("nfts");

  const onMintNFT = async () => {
    setGlobalState("loading", {
      show: true,
      msg: "Minting new NFT to your account",
    });

    await payToMint()
      .then(() => setAlert("Minting Successful...", "green"))
      .catch(() => setGlobalState("loading", { show: false, msg: "" }));
  };

  return (
    <div className="bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')] bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center items-center mx-auto py-10">
        <h1 className="text-white text-5xl font-bold text-center">
          A.I Arts <br />
          <span className="text-gradient">NFTs</span> Collection
        </h1>
        <p className="text-white font-semibold text-sm mt-3">
          Mint and collect the hottest NFTs around.
        </p>
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] p-2 rounded-full cursor-pointer my-4"
          onClick={onMintNFT}
        >
          Mint Now
        </button>
        <div className="shadow-xl shadow-black flex justify-center items-center w-10 h-10 rounded-full bg-white cursor-pointer p-3 ml-4 text-black hover:bg-[#bg255f] hover:text-white transition-all duration-75 delay-100">
          <span className="text-sm font-bold">{nfts.length}/99</span>
        </div>
      </div>
    </div>
  );
};
export default Hero;
