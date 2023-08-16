import React, { useContext, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Link, useRouter, useFocusEffect } from "expo-router";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import { signIn } from "../services/AuthService";
import PersistentKeyStore from "../lib/PersistentKeyStore";
import { AuthContext } from "../layouts/AuthProvider";
import { useMutate } from "../hooks/useMutate";
import { AxiosError, isAxiosError } from "axios";
import { AlertBox } from "../lib/alert";
import { Image } from "expo-image";
import { createNavigationContainerRef } from "@react-navigation/native";
import { LoginType } from "../interfaces";

export default function Base() {
  const router = useRouter();
  const { getUser } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      getUser()
        .then((user) => {
          console.log({ userLog: user.loginType });
          // router.push("/onboarding/congratulations");
          // return;
          if (user && user.loginType === LoginType.FirstTimeUser) {
            router.push("/onboarding/create-account");
          } else if (user && user.loginType === LoginType.UpdatedUser) {
            router.push("/home");
          } else {
            router.push("/onboarding/login");
          }
        })
        .catch((error) => {
          console.log(error);
          // router.push("/onboarding/login");
        });
    }, [])
  );
  return (
    <View className="items-center justify-center bg-[#0867F4] h-full">
      <Image
        className="object-contain w-full h-full"
        source={require("../assets/splash.png")}
        //   placeholder={blurhash}
        contentFit="contain"
        // transition={1000}
      />
    </View>
  );
}
