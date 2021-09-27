import "./App.css";
import Header from "./components/Header/Header";
import CryptoList from "./components/CryptoList/CryptoList";
import Footer from "./components/Footer/Footer";
import CryptoDetails from "./components/pages/CryptoDetails";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CryptoContexProvider from "./CryptoContex";
import Favorites from "./components/pages/Favorites";

function App() {
  return (
    <div className="App">
      <CryptoContexProvider>
        <Router>
          <Header />
          <Route exact={true} path="/">
            <CryptoList />
          </Route>
          <Route path="/details/:id">
            <CryptoDetails />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Router>
      </CryptoContexProvider>
      <Footer />
    </div>
  );
}

export default App;
