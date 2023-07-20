import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
      }}
      className="flex justify-between flex-1 h-full gap-4 p-8 "
    >
      <View className="flex-1 pt-24">
        <Text className="text-3xl text-primary">Let’s get you started</Text>
        <Text className="text-foreground">
          First, we have to verify if you have been admitted to this University.{" "}
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View className="flex-1">
          <Input placeholder="Mat. No" classNames="mb-2" />

          <Button
            replace
            href="/onboarding/congratulations"
            classNames="w-full"
            variant="default"
          >
            <Text className="text-primary-foreground">Verify Admission</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
      <View className="">
        <Link replace asChild href="/login">
          <Text className="text-center">
            Already have an account?{" "}
            <Text className="text-primary">Login </Text>
          </Text>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
