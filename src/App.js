import "./App.css";
import { useReducer, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { reducer, initialState } from "./reducer";
import Header from "./components/Header/Header";
import CryptoList from "./components/CryptoList/CryptoList";
import CryptoDetails from "./pages/CryptoDetails";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import CryptoContexProvider from "./context/CryptoContex";
import ConvertContexProvider from "./context/ConvertContext";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import Favorites from "./pages/Favorites";
import useWebsiteTitle from "./hooks/useWebsiteTitle";

const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useWebsiteTitle(`CoinPrice.pl - Main Page`);

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
          <CryptoContexProvider>
            <ConvertContexProvider>
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
                    <Route path="/details/:id" component={CryptoDetails} />
                    <Route path="/favorites" component={Favorites} />
                    {/* <Route path="/profile" component={Profile} /> */}
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" exact component={CryptoList} />
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </ReducerContext.Provider>
            </ConvertContexProvider>
          </CryptoContexProvider>
        </AuthContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
