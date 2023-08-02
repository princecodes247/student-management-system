import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";

export default function Clearance() {
  return (
    <View className="flex justify-start flex-1 gap-4 p-8">
      <View className="flex-1 pt-24">
        <Text className="text-2xl text-primary">You're almost done!</Text>
        <Text className="mt-4 text-base text-gray-400">
          Not to worry, we are saving you alot of stress, perhaps Hours of
          walking under the Hot sun
        </Text>
      </View>
      <View className="flex-1">
        <Button replace href="/(main)" classNames="w-full" variant="default">
          <Text className="text-primary-foreground">Continue</Text>
        </Button>
      </View>
      <View className="">
        <Link asChild href="/login">
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
