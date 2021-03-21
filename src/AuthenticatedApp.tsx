import React from "react";
import { Button } from "antd";
import ProjectList from "views/ProjectList";
import { useAuth } from "context/authContext";

export default function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <div>
      <Button onClick={logout}>退出登录</Button>
      <ProjectList />
    </div>
  );
}
