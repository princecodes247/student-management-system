import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";

export default function ForgotPassword() {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
      }}
      className="flex justify-between flex-1 h-full gap-4 p-8 pl-12 "
    >
      <View className="flex-1 pt-24">
        <Text className="text-4xl">Forgot Password</Text>
        <Text className="mt-4 text-gray-600">
          Please enter the OTP code sent to your Email/ Phone no
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View className="flex-1">
          <Input placeholder="Email" classNames="mb-2" />

          <Link replace asChild href="/">
            <Text className="mt-2 mb-4 text-right text-gray-600">
              Back to login
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
