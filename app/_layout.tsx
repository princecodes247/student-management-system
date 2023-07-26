import { SafeAreaView, View } from "react-native";
import { useEffect } from "react";
import { SplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";

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
    <View className="h-full ">
      <Slot />
      <StatusBar style="auto" />
    </View>
  );
}
