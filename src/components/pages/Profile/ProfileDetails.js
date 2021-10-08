const ProfileDetails = () => {
  return (
    <form className="text-start col-2">
      <h5 className="card-title">Your Profile Details</h5>
      <div className="form-group mt-3">
        <label>Email</label>
        <input
          type="email"
          value="email@frombackend.com"
          className="form-control"
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input type="password" value="*****" className="form-control" />
      </div>
      <button className="btn btn-primary fw-bold mt-3">Save</button>
    </form>
  );
};

export default ProfileDetails;
