import React, { useContext, ReactNode } from "react";
import { useMount } from "utils";
import { useAsync } from "utils";
import { http } from "utils/http";
import { User } from "types/projectList";
import * as auth from "../authProvider";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

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
    return <FullPageLoading tip="加载中..." />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
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
