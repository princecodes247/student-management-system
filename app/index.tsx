import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";

export default function App() {
  return (
    <View className="flex border justify-start gap-4 flex-1 p-8 text-red-600 border ">
      <View className="pt-24 flex-1">
        <Text className="text-red-400 text-3xl">Let’s get you started</Text>
        <Text className="text-red-400">
          First, we have to verify if you have been admitted to this University.{" "}
        </Text>
      </View>
      <View className="flex-1">
        <Input placeholder="Mat. No" className=""/>
        <Button classNames="w-full" variant="default">
          <Text className="text-primary-foreground">Verify Admission</Text>
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
