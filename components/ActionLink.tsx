import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface ActionLinkProps {
  className?: string;
  title: string;
  link: string;
  //   asChild?: boolean
}

const ActionLink = ({ className, link, title }: ActionLinkProps) => (
  <Link asChild href={link}>
    <Pressable className="relative flex-row justify-between w-full p-4 mb-4 bg-gray-100 rounded">
      <Text className="text-base">{title}</Text>

      <MaterialIcons name="chevron-right" size={24} color="gray" />
    </Pressable>
  </Link>
);

export { ActionLink };
