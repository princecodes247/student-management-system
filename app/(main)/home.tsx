import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable, ScrollView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Alert, AlertTitle } from "../../components/Alert";
import { ActionLink } from "../../components/ActionLink";
import { MaterialIcons } from "@expo/vector-icons";
import AuthorizedRoute from "../../layouts/AuthorizedRoute";
import { UserRole } from "../../interfaces";
import { AuthContext } from "../../layouts/AuthProvider";
import { AlertBox } from "../../lib/alert";
import { actionsList } from "../../constants";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <AuthorizedRoute allowedRoles={[UserRole.Student]}>
      <ScrollView className="h-full p-6 bg-[#f5f5f5] pt-14">
        <View className="flex-row justify-between">
          <Link href={"/profile"} asChild>
            <Pressable className="flex-row flex-1 gap-2">
              <View className="p-6 bg-gray-300 rounded-full"></View>
              <View className="flex-1">
                <Text className="text-base text-gray-800">
                  Hello {user?.firstname}
                </Text>
                <Text className="text-base text-gray-400">{user?.matno}</Text>
              </View>
            </Pressable>
          </Link>
          <View className="items-center justify-center">
            <Link href="/profile">
              <MaterialIcons name="notifications" size={30} color="gray" />
            </Link>
          </View>
        </View>
        <View className="w-full p-6 py-4 mt-8 rounded-xl bg-primary">
          <View className="flex-row gap-2 mb-2">
            <Text className="text-sm text-primary-foreground">
              Upcoming Lecture
            </Text>
            <Text className="text-sm text-primary-foreground">--</Text>
          </View>
          <Text className="mt-1 mb-3 text-xl text-primary-foreground">
            No lectures yet
          </Text>
          <View className="flex-row mt-8">
            <Button
              size="sm"
              classNames="border-white"
              textClassNames="text-white"
              variant="outline"
              href="/timetable"
            >
              Set Reminder
            </Button>

            <Button
              size="sm"
              classNames="ml-2 border-white"
              textClassNames="text-white"
              variant="outline"
              href="/timetable"
            >
              View Details
            </Button>
          </View>
        </View>

        <View className="mt-6">
          {/* <Alert
            classNames=""
            icon={<MaterialIcons name="info-outline" size={24} />}
            variant="warning"
          >
            <AlertTitle content="Complete your profile setup" />
          </Alert> */}
        </View>
        <View className="mt-8">
          <Text>Quick Actions</Text>
          <View className="mt-4">
            {React.Children.toArray(
              actionsList.map((action) => (
                <ActionLink
                  title={action.title}
                  description={action.description}
                  link={action.link}
                  icon={action.icon}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </AuthorizedRoute>
  );
}
