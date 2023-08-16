import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useRouter } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { useMutate } from "../../hooks/useMutate";
import { signIn } from "../../services/AuthService";
import PersistentKeyStore from "../../lib/PersistentKeyStore";
import { AuthContext } from "../../layouts/AuthProvider";

export default function GetStarted() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [matriculationNumber, setMatriculationNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginMutation = useMutate(signIn, {
    onErrorFunction: (error) => {},
    onMutateFunction: (data) => {
      console.log("I did it", data);
    },
    onSuccessFunction: async (data) => {
      await login(data.user, data.token, data.login_type);

      console.log("I did it", data);
      router.push("/home");
    },
  });

  return (
    // <KeyboardAvoidingView flex={3}>
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
          Kindly Login with your UTME Email address and your Jamb Reg Number to
          verify your admission
        </Text>
      </View>
      <View className="flex-[3] bg-white">
        <ScrollView className="flex-1 h-[100%]">
          <View className="flex-[3]">
            <View className="mb-2">
              <Text className="text-base text-gray-600">Username</Text>
              <Input
                onChange={(value) => {
                  setMatriculationNumber(value);
                }}
                value={matriculationNumber}
                placeholder="Matriculation Number"
                classNames="mt-2"
              />
            </View>
            <View className="mb-6">
              <Text className="text-base text-gray-600">Password</Text>
              <Input
                onChange={(value) => {
                  setPassword(value);
                }}
                value={password}
                type="password"
                placeholder="Password"
                classNames="mt-2"
              />
            </View>

            <Button
              // href="/onboarding/congratulations"
              onClick={() => {
                loginMutation.mutate({
                  matno: matriculationNumber,
                  password,
                });
              }}
              loading={loginMutation.isLoading}
              classNames="w-full"
              variant="default"
            >
              Verify Admission
            </Button>
            <Text>{loginMutation.isLoading ? "TTTT" : "FFFF"}</Text>
          </View>
          {/*
           */}
        </ScrollView>
      </View>

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
    // </KeyboardAvoidingView>
  );
}
