import { AppStateStatus, Platform, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import PersistentKeyStore from "../lib/PersistentKeyStore";
import { IUser, LoginType } from "../interfaces";

interface AuthContextProps {
  user: IUser | null;
  token: string | null;
  // setUser: (user: IUser | null) => void;
  getUser: () => Promise<IUser>;
  login: (user: IUser, token: string, loginType: LoginType) => Promise<void>;
  logout: () => Promise<void>;
}
// Create the authentication context
export const AuthContext = createContext<AuthContextProps>(null);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<IUser>(null);
  const [token, setToken] = React.useState<string>(null);
  const [loginType, setLoginType] = React.useState<LoginType>(null);
  // const user = PersistentKeyStore.getValueFor("user");
  const getUser = async () => await PersistentKeyStore.getValueFor("user");
  const logout = async () => {
    await PersistentKeyStore.deleteValueFor("user");
    await PersistentKeyStore.deleteValueFor("token");
    setUser(null);
    setToken(null);
    setLoginType(null);
  };
  const login = async (
    userData: IUser,
    token: string,
    _loginType: LoginType
  ) => {
    setUser(userData);
    setToken(token);
    setLoginType(_loginType);
    await PersistentKeyStore.save("user", {
      ...userData,
      loginType: _loginType,
    });
    await PersistentKeyStore.save("token", token ?? null);
    await PersistentKeyStore.save(
      "loginType",
      _loginType ?? LoginType.FirstTimeUser
    );
  };

  const authContextValue: AuthContextProps = {
    getUser,
    user,
    login,
    logout,
    token,
  };
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, []);
  return (
    <AuthContext.Provider value={authContextValue}>
      <View>{children}</View>
    </AuthContext.Provider>
  );
}
