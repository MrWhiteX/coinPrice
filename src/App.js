import "./App.css";
import { useReducer, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { reducer, initialState } from "./reducer";
import Header from "./components/Header/Header";
import CryptoList from "./components/CryptoList/CryptoList";
import CryptoDetails from "./pages/CryptoDetails";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import Favorites from "./pages/Favorites";
import useWebsiteTitle from "./hooks/useWebsiteTitle";
import { cryptoAxios } from "./axios";
import { useDispatch } from "react-redux";
import { addCrypto, copyCrypto, setLoading } from "./store/cryptoSlice";

const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useWebsiteTitle(`CoinPrice.pl - Main Page`);

  const dispatchCrypto = useDispatch();
  useEffect(() => {
    // dispatch(setLoading(true));

    const fetchCrypto = async () => {
      try {
        const response = await cryptoAxios.get("/tickers");
        dispatchCrypto(addCrypto(response.data));
        dispatchCrypto(copyCrypto(response.data));
        dispatchCrypto(setLoading(false));
      } catch (ex) {
        console.log(ex.response);
        dispatchCrypto(setLoading(false));
      }
    };

    fetchCrypto();

    const intervalID = setInterval(() => {
      const fetchUpdateCrypto = async () => {
        const response = await cryptoAxios.get("/tickers");
        dispatchCrypto(addCrypto(response.data));
      };
      fetchUpdateCrypto();
    }, 114000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider
          value={{
            user: state.user,
            login: (user) => dispatch({ type: "login", user }),
            logout: () => dispatch({ type: "logout" }),
          }}
        >
          <ReducerContext.Provider
            value={{
              state: state,
              dispatch: dispatch,
            }}
          >
            <Header />
            <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                <AuthenticatedRoute
                  path="/profile"
                  isAuthenticated={state.isAuthenticated}
                  component={Profile}
                />
                <AuthenticatedRoute
                  path="/favorites"
                  isAuthenticated={state.isAuthenticated}
                  component={Favorites}
                />
                <Route path="/search/:id" component={SearchPage} />
                <Route path="/details/:id" component={CryptoDetails} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" exact component={CryptoList} />

                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </ReducerContext.Provider>
        </AuthContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
