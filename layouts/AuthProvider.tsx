import { AppStateStatus, Platform, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import PersistentKeyStore from "../lib/PersistentKeyStore";
import { IUser } from "../interfaces";

interface AuthContextProps {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  // login: (userData: IUser) => void;
  // logout: () => void;
}
// Create the authentication context
export const AuthContext = createContext<AuthContextProps>(null);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = PersistentKeyStore.getValueFor("user");
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    PersistentKeyStore.getValueFor("user").then((data) => {
      console.log({ user });
      setUser(data);
    });
  }, []);
  const authContextValue: AuthContextProps = {
    user,
    setUser,
    // login,
    // logout,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      <View>{children}</View>
    </AuthContext.Provider>
  );
}
