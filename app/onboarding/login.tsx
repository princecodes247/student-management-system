import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useRouter } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { signIn } from "../../services/AuthService";
import PersistentKeyStore from "../../lib/PersistentKeyStore";
import { AuthContext } from "../../layouts/AuthProvider";
import { useMutate } from "../../hooks/useMutate";
import { AxiosError, isAxiosError } from "axios";
import { AlertBox } from "../../lib/alert";
import { LoginType } from "../../interfaces";

export default function Login() {
  const router = useRouter();
  const { user, login } = useContext(AuthContext);
  const [matriculationNumber, setMatriculationNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginMutation = useMutate(signIn, {
    onErrorFunction: (error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        // Access to config, request, and response
        AlertBox.show(
          "Error",
          error?.response?.data?.error ?? "An error occurred",
          []
        );
      }
    },
    onMutateFunction: (data) => {
      console.log("I did it", data);
    },
    onSuccessFunction: async (data) => {
      await login(data.user, data.token, data.login_type);

      console.log("I did it", data);
      return router.push("/home");
    },
  });
  useEffect(() => {
    if (user && user.loginType === LoginType.FirstTimeUser) {
      router.push("/onboarding/create-account");
    } else if (user && user.loginType === LoginType.UpdatedUser) {
      router.push("/home");
    }
  }, [user]);
  return (
    <KeyboardAvoidingView>
      <View className="flex justify-between flex-1 gap-4 p-8 ">
        <View className="flex-1 pt-24">
          <Text className="text-4xl">Login</Text>
          <Text className="mt-4 text-gray-600">
            Welcome back to your student management Application
          </Text>
        </View>

        <View className="flex-1">
          <View className="mb-2">
            <Text className="text-base text-gray-600">Username</Text>
            <Input
              onChange={(value) => {
                setMatriculationNumber(value);
              }}
              value={matriculationNumber}
              placeholder="Username"
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
              type="password"
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
                matno: matriculationNumber,
                password,
              });
            }}
            loading={loginMutation.isLoading}
          >
            Login
          </Button>
        </View>

        <View className="">
          {/* <Link replace asChild href="/">
            <Text className="text-center">
              Don’t have an account yet?{" "}
              <Text className="text-primary">Create one </Text>
            </Text>
          </Link> */}
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}
