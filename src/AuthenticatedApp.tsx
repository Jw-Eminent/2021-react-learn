import React from "react";
import ProjectList from "views/ProjectList";
import { useAuth } from "context/authContext";

export default function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>退出登录</button>
      <ProjectList />
    </div>
  );
}
