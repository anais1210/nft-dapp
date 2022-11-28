import Header from "./components/Header";
import Hero from "./components/Hero";
import Artworks from "./components/Artworks";
import Footer from "./components/Footer";
import Alert from "./components/Alert.jsx";
import Loading from "./components/Loading";
import { isWalletConnected, loadNfts } from "./NFTToken";
import { useEffect } from "react";
import { useGlobalState } from "./store";
const App = () => {
  const [nfts] = useGlobalState("nfts");
  useEffect(async () => {
    await isWalletConnected().then(() => {
      console.log("Blockchain loaded");
    });
    await loadNfts();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks artworks={nfts} />
      <Footer />
      <Alert />
      <Loading />
    </div>
  );
};

export default App;
