import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface PageIndicatorProps {
  className?: string;
  pageCount: number;
}

const PageIndicator = ({ className, pageCount }: PageIndicatorProps) => (
  <View>{pageCount}</View>
);

export { PageIndicator };
