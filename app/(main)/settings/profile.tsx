import React from "react";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";
import { AcademicRecords } from "../../../components/profile/AcademicRecords";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PersonalData } from "../../../components/profile/PersonalData";

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal Data" component={PersonalData} />
      <Tab.Screen name="Academic Records" component={AcademicRecords} />
    </Tab.Navigator>
  );
}
