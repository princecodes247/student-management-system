import { AppStateStatus, Platform, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import PersistentKeyStore from "../lib/PersistentKeyStore";
import { IUser } from "../interfaces";

interface AuthContextProps {
  user: IUser | null;
  token: string | null;
  // setUser: (user: IUser | null) => void;
  getUser: () => Promise<IUser>;
  login: (user: IUser, token: string) => Promise<void>;
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
  // const user = PersistentKeyStore.getValueFor("user");
  const getUser = async () => await PersistentKeyStore.getValueFor("user");
  const logout = async () => {
    await PersistentKeyStore.deleteValueFor("user");
    await PersistentKeyStore.deleteValueFor("token");
    setUser(null);
    setToken(null);
  };
  const login = async (userData: IUser, token: string) => {
    setUser(userData);
    setToken(token);
    await PersistentKeyStore.save("user", userData);
    await PersistentKeyStore.save("token", token ?? null);
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
