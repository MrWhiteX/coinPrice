import "./App.css";
import Header from "./components/Header/Header";
import CryptoList from "./components/CryptoList/CryptoList";
import Favourites from "./components/Favourites/Favourites";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CryptoContexProvider from "./CryptoContex";

function App() {
  return (
    <div className="App">
      <CryptoContexProvider>
        <Router>
          <Route exact={true} path="/">
            <Header />
            <CryptoList />
          </Route>

          <Route path="/favourites">
            <Header />
            <Favourites />
          </Route>
        </Router>
      </CryptoContexProvider>
      <Footer />
    </div>
  );
}

export default App;
