import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
      }}
      className="flex justify-between flex-1 h-full gap-4 p-8 "
    >
      <View className="flex-1 pt-24">
        <Text className="text-4xl">Login</Text>
        <Text className="mt-4 text-gray-600">
          Welcome back to your student management Application
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View className="flex-1">
          <Input placeholder="Mat. No" classNames="mb-2" />
          <Input placeholder="Password" classNames="" />
          <Link replace asChild href="/forgot-password">
            <Text className="mt-2 mb-4 text-right text-gray-600">
              Forgot Password?
            </Text>
          </Link>
          <Button
            replace
            href="/onboarding/congratulations"
            classNames="w-full"
            variant="default"
          >
            <Text className="font-semibold text-primary-foreground">Login</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
      <View className="">
        <Link replace asChild href="/">
          <Text className="text-center">
            Don’t have an account yet?{" "}
            <Text className="text-primary">Create one </Text>
          </Text>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
