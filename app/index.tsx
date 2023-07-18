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
        <Text className="text-foreground">
          First, we have to verify if you have been admitted to this University.{" "}
        </Text>
      </View>
      <View className="flex-1">
        <Input placeholder="Mat. No" className="" />

        <Button href="/home" classNames="w-full" variant="default">
          <Text className="text-primary-foreground">Verify Admission</Text>
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
