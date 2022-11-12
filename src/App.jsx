import Header from "./components/Header";
import Hero from "./components/Hero";
import Artworks from "./components/Artworks";
import Footer from "./components/Footer";
import Alert from "./components/Alert.jsx";
import Loading from "./components/Loading";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks />
      <Footer />
      <Alert />

      <Loading />
    </div>
  );
};

export default App;
