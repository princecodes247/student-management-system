import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
      }}
      className="flex justify-between flex-1 h-full gap-4 p-8 "
    >
      <View className="items-center justify-center flex-1 ">
        <Text className="mb-4 text-3xl text-gray-300">Loading...</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
