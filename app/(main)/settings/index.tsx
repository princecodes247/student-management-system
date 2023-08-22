import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView, Pressable } from "react-native";
import Button from "../../../components/Button";
import { AuthContext } from "../../../layouts/AuthProvider";
import AuthorizedRoute from "../../../layouts/AuthorizedRoute";
import { Link, useRouter } from "expo-router";
import { InAppRoutes } from "../../../constants";

export default function Settings() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  return (
    <AuthorizedRoute>
      <View className="h-full p-6 bg-white">
        <View className="">
          <Text className="mb-4 text-sm">Profile</Text>
          <Link href={"/settings/profile"} replace asChild>
            <Pressable className="flex-row w-full p-4 bg-gray-200 rounded-xl">
              <View className="pr-4">
                <View className="p-6 bg-gray-300 rounded-full"></View>
              </View>
              <View>
                <Text className="text-lg">{user?.firstname ?? ""}</Text>
                <Text className="text-gray-900">{user?.matno ?? ""}</Text>
              </View>
            </Pressable>
          </Link>
        </View>
        <View className="pt-12">
          <Text className="mb-4 text-sm">Other actions</Text>
          <Button
            variant="secondary"
            classNames=" justify-start items-start pl-6 mb-4"
            href={"/course-enrollment"}
            replace
          >
            Suspension of studies
          </Button>
          <Button
            variant="secondary"
            classNames=" justify-start items-start pl-6 mb-4"
            href={"/course-enrollment"}
            replace
          >
            Request Extra units
          </Button>
          <Button
            variant="secondary"
            classNames=" justify-start items-start pl-6 mb-4"
            href={"/course-enrollment"}
            replace
          >
            Change Password
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              router.replace(InAppRoutes.login);
              logout();
            }}
          >
            Sign Out
          </Button>
        </View>
      </View>
    </AuthorizedRoute>
  );
}
