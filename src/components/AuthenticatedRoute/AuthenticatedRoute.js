import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import ReducerContext from "../../context/reducerContext";

const AuthenticatedRoute = (props) => {
  const context = useContext(ReducerContext);
  return context.state.user ? <Route {...props} /> : <Redirect to="/login" />;
};

export default AuthenticatedRoute;
