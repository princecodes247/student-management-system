import { View } from "react-native";
import { useEffect } from "react";
import { SplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import QueryProvider from "../layouts/QueryProvider";
import AuthProvider from "../layouts/AuthProvider";
import Root from "../layouts/Root";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Prevent rendering until the font has loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <Root>
          {/* <NavigationContainer>
    </NavigationContainer> */}
          <View className="h-full ">
            <Slot />
            <StatusBar style="auto" />
          </View>
        </Root>
      </AuthProvider>
    </QueryProvider>
  );
}
