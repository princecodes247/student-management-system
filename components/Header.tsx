import * as React from "react";

import { cn } from "../lib/utils";
import { View, Text, TextInput } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export interface HeaderProps {
  title?: string;
  placeholder?: string;
  style: any;
}

const Header = ({ title, style = {}, ...props }: HeaderProps) => {
  return (
    <View className="flex-row items-center gap-3 p-5 px-8 pt-14 bg-gray-50">
      <Link href="/home">
        <MaterialIcons name="arrow-left" size={30} color="gray" />
      </Link>
      <Text className="text-xl capitalize ">{title}</Text>
    </View>
  );
};

Header.displayName = "Header";

export { Header };
