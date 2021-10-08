const Login = () => {
  return (
    <div className="container mt-5">
      <form className="text-start col-12">
        <h5 className="card-title fs-3">Please enter your details to log in</h5>
        <div className="col-2 form-group mt-3">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="col-2 form-group mt-3">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <button className="btn btn-primary fw-bold mt-3">Login</button>
      </form>

      <div className="text-start mt-5">
        <p className="fs-3">Create an account</p>
        <button className="btn btn-primary fw-bold">Register</button>
      </div>
    </div>
  );
};

export default Login;
