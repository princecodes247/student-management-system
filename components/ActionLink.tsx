import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";

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
      <Text>N</Text>
    </Pressable>
  </Link>
);

export { ActionLink };
