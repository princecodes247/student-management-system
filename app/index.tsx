import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Link, useRouter } from "expo-router";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import { signIn } from "../services/AuthService";
import PersistentKeyStore from "../lib/PersistentKeyStore";
import { AuthContext } from "../layouts/AuthProvider";

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [matriculationNumber, setMatriculationNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const loginMutation = signIn({
    onError: (error) => {
      console.log("I did it", error);
      setIsLoading(false);
    },
    onMutate: (data) => {
      setIsLoading(true);
    },
    onSuccess: async (data) => {
      await login(data);
      setIsLoading(false);
      console.log("I did it", data);
      router.push("/home");
    },
  });
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
      }}
      className="flex justify-between flex-1 h-full gap-4 p-8 pl-12 "
    >
      <View className="flex-1 pt-24">
        <Text className="text-4xl">Login</Text>
        <Text className="mt-4 text-gray-600">
          Welcome back to your student management Application
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View className="flex-1">
          <View className="mb-2">
            <Text className="text-base text-gray-600">
              Matriculation Number
            </Text>
            <Input
              onChange={(value) => {
                setMatriculationNumber(value);
              }}
              value={matriculationNumber}
              placeholder="Matriculation Number"
              classNames="mt-2"
            />
          </View>
          <View className="mb-2">
            <Text className="text-base text-gray-600">Password</Text>
            <Input
              onChange={(value) => {
                setPassword(value);
              }}
              value={password}
              placeholder="Password"
              classNames="mt-2"
            />
          </View>

          <Link replace asChild href="/forgot-password">
            <Text className="mt-2 mb-4 text-right text-gray-600">
              Forgot Password?
            </Text>
          </Link>

          <Button
            // replace
            // href="/onboarding/congratulations"
            classNames="w-full"
            variant="default"
            onClick={() => {
              loginMutation.mutate({
                matriculationNumber,
                password,
              });
            }}
            loading={isLoading}
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
