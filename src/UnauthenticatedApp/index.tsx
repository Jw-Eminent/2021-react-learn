import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "去登录" : "去注册"}
      </button>
    </div>
  );
}
