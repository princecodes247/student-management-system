import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Alert, AlertTitle } from "../../components/Alert";
import { Picker } from "../../components/Picker";
import { CheckResult } from "../../components/results/CheckResult";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SavedResults } from "../../components/results/SavedResults";

const Tab = createMaterialTopTabNavigator();

export default function Results() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Check Result" component={CheckResult} />
      <Tab.Screen name="Saved Results" component={SavedResults} />
    </Tab.Navigator>
  );
}
