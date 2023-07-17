import React from "react"
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="text-red-600 flex flex-1 justify-center items-center ">
      <Text className="text-red-400">Open up App.js to start working on yousr app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
