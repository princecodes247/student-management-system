import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { UserRole } from "../interfaces";
import PersistentKeyStore from "../lib/PersistentKeyStore";

interface AuthorizedRouteProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  allowedRoles = [UserRole.Student],
  children,
}) => {
  const router = useRouter();

  const { getUser } = useContext(AuthContext);
  const user = getUser().then((data) => {
    if (!data || !allowedRoles.includes(data.role)) {
      // alert(user.id);
      console.log({ tryData: data });
      // User is not logged in or doesn't have the required role
      router.replace("/");
      return null;
    }
  });

  return <View>{children}</View>;
};

export default AuthorizedRoute;
