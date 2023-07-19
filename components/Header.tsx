import * as React from "react";

import { cn } from "../lib/utils";
import { View, Text, TextInput } from "react-native";

export interface HeaderProps {
  title?: string;
  placeholder?: string;
  style: any;
}

const Header = ({ title, style = {}, ...props }: HeaderProps) => {
  return (
    <View className="flex-row items-center gap-3 p-5 px-8 bg-gray-200">
      <Text className="mr-4 text-2xl">B</Text>
      <Text className="text-xl capitalize ">{title}</Text>
    </View>
  );
};

Header.displayName = "Header";

export { Header };
