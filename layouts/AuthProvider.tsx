import { AppStateStatus, Platform, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import PersistentKeyStore from "../lib/PersistentKeyStore";
import { IUser } from "../interfaces";

interface AuthContextProps {
  user: IUser | null;
  // setUser: (user: IUser | null) => void;
  getUser: () => Promise<IUser>;
  login: (user: IUser) => Promise<void>;
  logout: () => Promise<void>;
}
// Create the authentication context
export const AuthContext = createContext<AuthContextProps>(null);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = PersistentKeyStore.getValueFor("user");
  const getUser = async () => await PersistentKeyStore.getValueFor("user");
  const logout = async () => {
    await PersistentKeyStore.deleteValueFor("user");
    setUser(null);
  };
  const login = async (userData: IUser) => {
    setUser(userData);
    await PersistentKeyStore.save("user", userData);
    await PersistentKeyStore.save("token", userData?.token ?? null);
  };
  const [user, setUser] = React.useState<IUser>(null);
  const authContextValue: AuthContextProps = {
    getUser,
    user,
    login,
    logout,
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
