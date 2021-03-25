import React from "react";
import { useAuth } from "./context/authContext";
import AuthenticatedApp from "AuthenticatedApp";
import UnauthenticatedApp from "UnauthenticatedApp";
import "./App.css";
import ErrorBoundary from "components/ErrorBoundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
