import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Alert, AlertTitle } from "../../components/Alert";
import { Picker } from "../../components/Picker";

export default function Profile() {
  return (
    <View className="items-center justify-center h-full p-6 bg-white">
      <View>
        <Text className="text-lg text-gray-400">Coming Soon...</Text>
      </View>
    </View>
  );
}
