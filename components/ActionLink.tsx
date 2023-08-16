import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Icon, { AvailableIcons } from "./Icon";

export interface ActionLinkProps {
  className?: string;
  title: string;
  description: string;
  link: string;
  icon: AvailableIcons;
  //   asChild?: boolean
}

const ActionLink = ({
  className,
  link,
  title,
  description,
  icon,
}: ActionLinkProps) => (
  <Link asChild href={link}>
    <Pressable className="relative flex-row justify-between w-full p-4 mb-4 bg-white rounded">
      <View className="flex-row">
        <View className="mr-2">
          <Icon name={icon} classNames="w-[50px] aspect-[1/1]" />
        </View>
        <View>
          <Text className="text-base">{title}</Text>
          <Text className="text-sm">{description}</Text>
        </View>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="gray" />
    </Pressable>
  </Link>
);

export { ActionLink };
