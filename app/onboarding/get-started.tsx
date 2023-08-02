import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { useQuery } from "@tanstack/react-query";

export default function GetStarted() {
  const testQuery = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return res.json();
    },
  });
  console.log(testQuery);

  return (
    <KeyboardAvoidingView flex={3}>
      <View
        style={{
          flex: 1,
          height: "100%",
        }}
        className="flex justify-between flex-1 h-[100vh] gap-4 p-8 border-2 border-red-300 "
      >
        <View className="flex-[2] pt-24">
          <Text className="mb-4 max-w-[300px] text-3xl">
            Welcome to <Text className="mb-4 text-3xl text-primary">NDU</Text>{" "}
            student management Application
          </Text>
          <Text className="mt-6 text-base leading-5 text-gray-500">
            Kindly Login with your UTME Email address and your Jamb Reg Nnumber
            to verify your admission
          </Text>
        </View>
        <View className="flex-[3] bg-white">
          <ScrollView className="flex-1 h-[100%]">
            <View className="flex-[3]">
              {/* <View className="flex-1"> */}
              <View className="mb-6">
                <Text className="text-base text-gray-600">Email address</Text>
                <Input placeholder="Email address" classNames="mt-2" />
              </View>
              <View className="mb-2">
                <Text className="text-base text-gray-600">Jamb Reg No</Text>
                <Input placeholder="Jamb Reg No" classNames="mt-2" />
              </View>

              <Button
                replace
                href="/onboarding/congratulations"
                classNames="w-full"
                variant="default"
              >
                <Text className="text-primary-foreground">
                  Verify Admission
                </Text>
              </Button>
            </View>
          </ScrollView>
        </View>

        {/* </View> */}
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
    </KeyboardAvoidingView>
  );
}
