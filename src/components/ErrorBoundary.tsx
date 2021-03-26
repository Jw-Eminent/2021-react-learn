/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

interface StateType {
  error: Error | null;
}
// https://github.com/bvaughn/react-error-boundary

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  StateType
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }

    return children;
  }
}

export default ErrorBoundary;
