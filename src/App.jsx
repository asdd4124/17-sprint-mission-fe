import Header from "./components/Header";
import Footer from "./components/Footer";
import BestProducts from "./components/BestProducts";
import AllProducts from "./components/AllProducts";

function App() {
  return (
    <>
      <Header />
      <main className="market">
        <BestProducts />
        <AllProducts />
      </main>
      <Footer />
    </>
  );
}

export default App;
