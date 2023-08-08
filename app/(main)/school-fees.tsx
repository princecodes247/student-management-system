import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Alert, AlertTitle } from "../../components/Alert";
import { Picker } from "../../components/Picker";
import { useQuery } from "../../hooks/useQuery";
import { getFees } from "../../services/SchoolFeesService";
import { AuthContext } from "../../layouts/AuthProvider";
import formatMatNo from "../../lib/formatMatNo";

export default function SchoolFees() {
  const { user, token } = useContext(AuthContext);
  const fees = useQuery(
    async () => {
      console.log("why here");
      const res = await getFees(formatMatNo(user.matno), 100);
      return [...res.data.fees, ...res.data.fees];
    },
    {
      onSuccessFunction: (data) => {
        console.log({ data });
      },
      // isDisabled: !token,
    }
  );
  return (
    <View className="h-full p-6 bg-white">
      <View>
        <Text>What Session Do you want to payhhhh for</Text>
        <View className="flex-1 pt-8 pb-8">
          <Text className="mt-8 mb-4 text-xl font-semibold">Courses</Text>
          {!fees.isLoading && fees?.data?.length > 0 ? (
            React.Children.toArray(
              fees.data.map((item) => (
                <View
                  className="p-8 py-6 mb-2 bg-gray-100 border border-gray-200"
                  key={item.id}
                >
                  <Text>{item.id}dd</Text>
                </View>
              ))
            )
          ) : (
            <View className="py-6">
              <Text className="text-center text-gray-500">No courses yet</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
