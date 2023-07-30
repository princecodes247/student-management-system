import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { ChatOverviewType } from "../interfaces";

const ChatOverview = ({ item }: { item: ChatOverviewType }) => (
  <Pressable
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
      },
    ]}
    className="flex-row justify-between gap-2 my-4"
  >
    <View className="flex-1">
      <Text className="text-xl font-bold">{item.name}</Text>
      <Text className="text-gray-400">{item.lastMessage}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-right text-gray-400">{item.lastMessageTime}</Text>
      <Text className="text-right text-gray-400">{item.unreadMessages}</Text>
    </View>
  </Pressable>
);

export { ChatOverview };
