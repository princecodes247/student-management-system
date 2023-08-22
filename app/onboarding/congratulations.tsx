import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";

export default function OnboardingCongratulations() {
  return (
    <View className="flex justify-start flex-1 gap-4 p-8 ">
      <View className="flex-1 pt-24">
        <Text className="text-4xl text-primary">
          Congratulations you&apos;ve been admitted to Niger Delta University
        </Text>
      </View>
      <View className="flex-1">
        <Button
          replace
          href="/onboarding/create-account"
          classNames="w-full"
          variant="default"
        >
          Continue
        </Button>
      </View>
      <View className="">
        <Link asChild href="/login">
          <Text className="text-center text-red-600">Logout</Text>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
