import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingButton from "../../components/UI/LoadingButton";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "../../axios.auth";

const Login = () => {
  const [auth, setAuth] = useAuth(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  useWebsiteTitle("CoinPrice.pl - Login");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      history.push("/");
    } catch (ex) {
      setLoading(false);
      setPassword("");
      switch (ex.response.data.error.message) {
        case "INVALID_PASSWORD":
          setError("Invalid Password");
          break;
        case "EMAIL_NOT_FOUND":
          setError("Email not found");
          break;
        default:
          setError("Complete the details to login");
      }
    }
  };

  if (auth) {
    history.push("/");
  }

  return (
    <div className="container mt-5">
      <form className="text-start col-12" onSubmit={submit}>
        <h5 className="card-title fs-4 fs-md-3">
          Please enter your details to log in
        </h5>
        {error ? (
          <div className="alert alert-danger fw-bold">{error}</div>
        ) : null}
        <div className="col-md-3 col-lg-2 form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-lg-2 form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <LoadingButton loading={loading}>Login</LoadingButton>
      </form>

      <div className="text-start mt-5">
        <p className="fs-3">Create an account</p>
        <Link to="/register" className="btn btn-primary fw-bold">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
