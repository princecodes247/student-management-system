import { AppStateStatus, Platform, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    router.replace("/onboarding/get-started");
  }, []);
  return <View>{children}</View>;
}

const rootStyles = StyleSheet.create({
  rootContainer: {
    // va,
  },
});
