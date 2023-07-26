import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Alert, AlertTitle } from "../../components/Alert";
import { Picker } from "../../components/Picker";

export default function Timetable() {
  return (
    <View className="h-full p-6 bg-white">
      <View className="flex-row justify-between gap-2">
        <View className="flex-1">
          <Picker
            placeholder="Choose Department"
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
          />
        </View>
        <View className="flex-1">
          <Picker
            placeholder="Select Level"
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
          />
        </View>
      </View>
      <View className="flex-1 mt-6">
        <View className="w-full p-6 mt-8 bg-gray-100 border rounded-xl">
          <View className="flex-row gap-2">
            <Text className="text-sm text-primary-foreground">
              Upcoming Lecture
            </Text>
            <Text className="text-sm text-primary-foreground">2pm</Text>
          </View>
          <Text className="mt-1 text-xl text-primary-foreground">
            EEE351 - Logic & Digital systems
          </Text>
          <View className="flex-row mt-8">
            <Button
              size="sm"
              classNames="border-white"
              variant="outline"
              href="to"
            >
              <Text className="text-white">Set Reminder</Text>
            </Button>
            <Button
              size="sm"
              classNames="ml-2 border-white"
              variant="outline"
              href="to"
            >
              <Text className="text-white">Set Reminder</Text>
            </Button>
          </View>
        </View>

        <Text className="mt-6 text-gray-600">
          Note that this timetable is subject to change and it is best that you
          keep contact with your course rep
        </Text>
      </View>
      <View className="mt-8">
        <Button variant="outline" classNames="border-2">
          <Text className="font-semibold text-primary">Save Timetable</Text>
        </Button>
      </View>
    </View>
  );
}
