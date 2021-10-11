import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // save error log
  }

  render() {
    if (this.state.hasError) {
      return <h1>We have a problem</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
