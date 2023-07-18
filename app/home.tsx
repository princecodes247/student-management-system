import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex justify-start flex-1 gap-4 p-8 text-red-600 border ">
      <View className="flex-1 pt-24">
        <Text className="text-3xl text-primary">Let’s get you started</Text>
        <Text className="text-foreground">Home</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
