import React, { useContext, ReactNode } from "react";
import { Spin, Typography } from "antd";
import styled from "@emotion/styled";
import { DevTools } from "jira-dev-tool";
import { useMount } from "utils";
import { useAsync } from "utils";
import { http } from "utils/http";
import { User } from "views/ProjectList/type";
import * as auth from "../authProvider";

interface AutchForm {
  username: string;
  password: string;
}

interface ContextType {
  user: User | null;
  register: (form: AutchForm) => Promise<void>;
  login: (form: AutchForm) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<ContextType | undefined>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    isIdle,
    isLoading,
    isError,
    setData: setUser,
    data: user,
    error,
  } = useAsync<User | null>();

  const login = (form: AutchForm) => auth.login(form).then(setUser);
  const register = (form: AutchForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  const initUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
      const data = await http("/me", { token });
      user = data.user;
    }
    return user;
  };

  useMount(() => {
    run(initUser());
  });

  if (isIdle || isLoading) {
    return (
      <FullScreenStatus>
        <Spin spinning size="large" tip="加载中..." />
      </FullScreenStatus>
    );
  }

  if (isError) {
    return (
      <FullScreenStatus>
        <DevTools />
        <Typography.Text type="danger">
          {error?.message || "出错啦..."}
        </Typography.Text>
      </FullScreenStatus>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

const FullScreenStatus = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
