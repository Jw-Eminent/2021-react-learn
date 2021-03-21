import React, { useState } from "react";
import { Card, Button } from "antd";
import Login from "./Login";
import Register from "./Register";

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <Register /> : <Login />}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "去登录" : "去注册"}
        </Button>
      </Card>
    </div>
  );
}
