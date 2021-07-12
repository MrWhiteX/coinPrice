import "./App.css";
import Header from "./components/Header/Header";
import CryptoList from "./components/CryptoList/CryptoList";
import Favourites from "./components/Favourites/Favourites";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact={true} path="/">
          <Header />
          <CryptoList />
        </Route>
        <Route path="/favourites">
          <Header />
          <Favourites/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
