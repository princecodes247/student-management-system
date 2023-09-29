import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GroupChats } from "../../../components/chats/GroupChats";
import { PersonalChats } from "../../../components/chats/PersonalChats";

const Tab = createMaterialTopTabNavigator();

export default function Chats() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal Chats" component={PersonalChats} />
      <Tab.Screen name="Group Chats" component={GroupChats} />
    </Tab.Navigator>
  );
}
