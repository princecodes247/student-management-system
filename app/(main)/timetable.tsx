import React from "react";
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
          {/* <Picker
            value={"100l"}
            placeholder="Choose Level"
            items={[
              { label: "100 level", value: "100l" },
              { label: "200 level", value: "200l" },
              { label: "300 level", value: "300l" },
            ]}
          /> */}
        </View>
        <View className="flex-1">
          {/* <Picker
            value={"1"}
            placeholder="Select Semester"
            items={[
              { label: "1st semester", value: "1" },
              { label: "2nd semester", value: "2" },
            ]}
          /> */}
        </View>
      </View>
      <View className="flex-1 mt-6">
        <View className="w-full p-6 h-[180px] mt-8 bg-gray-100 border rounded"></View>

        <Text className="mt-6 text-gray-600">
          Note that this timetable is subject to change and it is best that you
          keep contact with your course rep
        </Text>
      </View>
      <View className="mt-8">
        <Button variant="outline" classNames="border-2">
          Save Timetable
        </Button>
      </View>
    </View>
  );
}
