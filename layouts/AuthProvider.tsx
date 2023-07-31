import { AppStateStatus, Platform, View } from "react-native";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View>{children}</View>;
}
