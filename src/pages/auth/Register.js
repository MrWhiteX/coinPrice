import { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingButton from "../../components/UI/LoadingButton";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "../../axios.auth";

const Register = () => {
  const [auth, setAuth] = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useWebsiteTitle("CoinPrice.pl - Register");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("accounts:signUp", {
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
      console.log(ex.response);

      switch (ex.response.data.error.message) {
        case "WEAK_PASSWORD : Password should be at least 6 characters":
          setError("Password should be at least 6 characters");
          break;
        case "EMAIL_EXISTS":
          setError("Sorry, email address already exists.");
          break;
        default:
          setError("Complete the details to create an account");
      }
    }

    setLoading(false);
  };

  if (auth) {
    history.push("/");
  }

  return (
    <div className="container mt-5">
      <form className="text-start col-12" onSubmit={submit}>
        <h5 className="card-title fs-4 fs-md-3">
          Please enter your details to create account
        </h5>
        {error ? (
          <div className="alert alert-danger fw-bold">{error}</div>
        ) : null}
        <div className="col-2 form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-2 form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <LoadingButton loading={loading}>Register</LoadingButton>
      </form>
    </div>
  );
};

export default Register;
