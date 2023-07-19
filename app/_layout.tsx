import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";

export default function AppLayout() {
  return (
    <SafeAreaView className="h-[104%]">
      <Slot />
    </SafeAreaView>
  );
}
