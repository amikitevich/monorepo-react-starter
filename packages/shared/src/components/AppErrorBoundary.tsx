import React from 'react';

type ErrorState = {
  hasError: boolean;
  error?: Error;
};

class AppErrorBoundary extends React.Component<{}, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="page">
          <h1>OOPS</h1>
          <code>{JSON.stringify(this.state.error)}</code>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
