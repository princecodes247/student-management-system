import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { ChatOverviewType } from "../interfaces";

const ChatOverview = ({ item }: { item: ChatOverviewType }) => (
  <Pressable
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? "red" : "white",
      },
    ]}
    className="flex-row justify-between gap-2 my-4"
  >
    <View>
      <View className="p-3 bg-gray-200 rounded-full min-w-[50px] aspect-[1/1]"></View>
    </View>
    <View className="flex-1">
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text className="text-gray-400">{item.lastMessage}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-right text-gray-400">{item.lastMessageTime}</Text>
      <Text className="text-right text-gray-400">{item.unreadMessages}</Text>
    </View>
  </Pressable>
);

export { ChatOverview };
