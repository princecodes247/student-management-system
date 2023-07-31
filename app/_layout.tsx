import { SafeAreaView, View } from "react-native";
import { useEffect } from "react";
import { SplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import { AppStateStatus, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { useAppState } from "../hooks/useAppState";

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

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

  useOnlineManager();

  useAppState(onAppStateChange);

  return (
    <View className="h-full ">
      <Slot />
      <StatusBar style="auto" />
    </View>
  );
}
