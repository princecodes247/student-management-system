import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Alert, AlertTitle } from "../../components/Alert";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 h-full">
      <View className="p-6">
        <View className="flex-row justify-between">
          <View className="flex-row flex-1 gap-2">
            <View className="p-6 bg-black"></View>
            <View className="flex-1">
              <Text className="text-base text-primary">Hello David</Text>
              <Text className="text-base text-gray-400">UG/17/1233</Text>
            </View>
          </View>
          <View>
            <Text>BE</Text>
          </View>
        </View>
        <View className="w-full p-6 mt-8 rounded-xl bg-primary">
          <View className="flex-row gap-2">
            <Text className="text-sm text-primary-foreground">
              Upcoming Lecture
            </Text>
            <Text className="text-sm text-primary-foreground">2pm</Text>
          </View>
          <Text className="mt-1 text-xl text-primary-foreground">
            EEE351 - Logic & Digital systems
          </Text>
          <View className="flex-row mt-8">
            <Button
              size="sm"
              classNames="border-white"
              variant="outline"
              href="to"
            >
              <Text className="text-white">Set Reminder</Text>
            </Button>
            <Button
              size="sm"
              classNames="ml-2 border-white"
              variant="outline"
              href="to"
            >
              <Text className="text-white">Set Reminder</Text>
            </Button>
          </View>
        </View>

        <View className="mt-6">
          <Alert>
            <AlertTitle content="Complete your profile setup" />
          </Alert>
        </View>
        <View className="mt-8">
          <Text>Quick Actions</Text>
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
}
