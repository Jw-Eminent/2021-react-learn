import React, { useState, useContext, ReactNode } from "react";
import { useMount } from "utils";
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

const initUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("/me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AutchForm) => auth.login(form).then(setUser);
  const register = (form: AutchForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    initUser().then(setUser);
  });

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
