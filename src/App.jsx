import Header from "./components/Header";
import Footer from "./components/Footer";
import AllProducts from "./components/AllProducts";

function App() {
  return (
    <>
      <Header />
      <main className="market">
        <AllProducts />
      </main>
      <Footer />
    </>
  );
}

export default App;
