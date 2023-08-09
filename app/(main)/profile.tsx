import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { AuthContext } from "../../layouts/AuthProvider";
import AuthorizedRoute from "../../layouts/AuthorizedRoute";
import { useRouter } from "expo-router";

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  return (
    <AuthorizedRoute>
      <View className="h-full p-6 bg-white">
        <Button
          variant="secondary"
          classNames=" justify-start items-start pl-6 mb-4"
          href={"/courses"}
          replace
        >
          My Courses
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            router.replace("/");
            logout();
          }}
        >
          Sign Out
        </Button>
      </View>
    </AuthorizedRoute>
  );
}
