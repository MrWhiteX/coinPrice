/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import LoadingButton from "../../components/UI/LoadingButton";
import { validateEmail } from "../../helpers/validations";
import useAuth from "../../hooks/useAuth";
import axios from "../../axios.auth";

const ProfileDetails = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        idToken: auth.token,
        email: email,
        returnSecureToken: true,
      };
      if (password) {
        data.password = password;
      }
      const res = await axios.post("accounts:update", data);
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      setSucess(true);
    } catch (ex) {
      console.log(ex.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setError({ ...error, email: "" });
    } else {
      setError({ ...error, email: "Invalid email address" });
    }
  }, [email]);

  useEffect(() => {
    if (password.length >= 4 || password.length === 0) {
      setError({ ...error, password: "" });
    } else {
      setError({ ...error, password: "Require more then 4 characters" });
    }
  }, [password]);

  const buttonDisabled = Object.values(error).filter((x) => x).length;

  return (
    <form className="text-start col-12 " onSubmit={submit}>
      <h5 className="card-title">Your Profile Details</h5>
      {sucess ? (
        <div className="alert alert-success fw-bold">Data Saved</div>
      ) : null}
      <div className="col-md-3 col-lg-2 form-group mt-3">
        <label>Email</label>
        <input
          type="email"
          value={email}
          className={`form-control ${error.email ? "is-invalid" : `is-valid`}`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="invalid-feedback fw-bold">{error.email}</div>
        <div className="valid-feedback fw-bold">Great!</div>
      </div>

      <div className="col-md-3 col-lg-2 form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          className={`form-control ${error.password ? "is-invalid" : ``}`}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="invalid-feedback fw-bold">{error.password}</div>
      </div>
      <LoadingButton loading={loading} disabled={buttonDisabled}>
        Save
      </LoadingButton>
    </form>
  );
};

export default ProfileDetails;
