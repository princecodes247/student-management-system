import { SafeAreaView, View } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  return (
    <View className="h-full ">
      <Slot />
      <StatusBar style="auto" />
    </View>
  );
}
