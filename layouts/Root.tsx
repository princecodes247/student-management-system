import { AppStateStatus, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";

export default function Root({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const url = Linking.useURL();
  useEffect(() => {
    if (!url) return;
    const { hostname, path, queryParams } = Linking.parse(url);
    console.log({ path, queryParams });
    if (path && path.includes("school-fees-successful")) {
      router.replace(`/${path}?ref=${queryParams.reference}`);
      return;
    }
    // router.replace("/home");
    // router.replace("/onboarding/clearance");
    // router.replace("/onboarding/create-account");
  }, [url]);
  return <View>{children}</View>;
  // return (
  //   <View>
  //     <Text>HIII</Text>
  //   </View>
  // );
}

const rootStyles = StyleSheet.create({
  rootContainer: {
    // va,
  },
});
