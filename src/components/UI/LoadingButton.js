const LoadingButton = (props) => {
  return props.loading ? (
    <button className="btn btn-primary mt-3" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Loading...</span>
    </button>
  ) : (
    <button {...props} className="btn btn-primary fw-bold mt-3">
      {props.children}
    </button>
  );
};

export default LoadingButton;
