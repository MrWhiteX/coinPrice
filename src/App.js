import "./App.css";
import { useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  AuthenticatedRoute,
} from "react-router-dom";
import Header from "./components/Header/Header";
import CryptoList from "./components/CryptoList/CryptoList";
import CryptoDetails from "./components/pages/CryptoDetails";
import Profile from "./components/pages/Profile/Profile";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/pages/NotFound/NotFound";
import Login from "./components/pages/auth/Login";
import CryptoContexProvider from "./context/CryptoContex";
import ConvertContexProvider from "./context/ConvertContext";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import Favorites from "./components/pages/Favorites";
import { reducer, initialState } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state.isAuthenticated);

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
                <Switch>
                  <Route path="/details/:id" component={CryptoDetails} />
                  <Route path="/favorites" component={Favorites} />
                  {/* <Route path="/profile" component={Profile} /> */}
                  <Route path="/profile" component={Profile} />
                  <Route path="/login" component={Login} />
                  <Route path="/" exact component={CryptoList} />
                  <Route component={NotFound} />
                </Switch>
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
