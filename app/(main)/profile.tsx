import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { AuthContext } from "../../layouts/AuthProvider";
import AuthorizedRoute from "../../layouts/AuthorizedRoute";

export default function Profile() {
  const { logout } = useContext(AuthContext);
  return (
    <AuthorizedRoute>
      <View className="h-full p-6 bg-white">
        <Button
          variant="default"
          classNames="bg-gray-100 justify-start items-start pl-6 mb-4"
          href={"/courses"}
          replace
        >
          <Text className="text-base text-gray-700">My Courses</Text>
        </Button>
        <Button variant="destructive" onClick={logout}>
          <Text className="text-base text-white">Sign Out</Text>
        </Button>
      </View>
    </AuthorizedRoute>
  );
}
