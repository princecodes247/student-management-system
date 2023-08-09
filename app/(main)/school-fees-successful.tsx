import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Alert, AlertTitle } from "../../components/Alert";
import { Picker } from "../../components/Picker";
import { useQuery } from "../../hooks/useQuery";
import { getFeesDetails } from "../../services/SchoolFeesService";
import { useRouter, useSearchParams } from "expo-router";

export default function SchoolFeesSuccessful() {
  const params = useSearchParams();
  const feesDetails = useQuery(
    async () => {
      const res = await getFeesDetails(params?.ref);
      return res.data.data;
    },
    {
      onSuccessFunction: (data) => {
        console.log({ data: data.matno });
      },
      onErrorFunction: (error) => {
        console.log({ error: error });
      },
      isDisabled: !params?.ref,
    }
  );
  return (
    <View className="h-full p-6 bg-white">
      <View className="justify-between flex-1 py-8">
        <Text className="text-5xl text-primary">
          School Fees Payment Successful
        </Text>
      </View>
      {feesDetails.isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : feesDetails.isError ? (
        <View>
          <Text>Error...</Text>
        </View>
      ) : (
        <View className="">
          <View className="flex-row p-2 mb-8 bg-gray-100 border border-gray-200 rounded-xl">
            <View className="p-2 bg-blue-200 rounded aspect-square"></View>
            <View className="flex-1 p-2 ml-2 rounded-xl">
              <Text className="text-base">
                {feesDetails?.data?.matno ?? ""}{" "}
                {feesDetails?.data?.level ?? ""} level Fees
              </Text>
              <Text>{feesDetails?.data?.academicSession ?? ""}</Text>
            </View>
          </View>
          <Button variant="default" classNames="mb-2">
            Download Reciept
          </Button>
          <Button variant="outline" classNames="border-2">
            Go Home
          </Button>
        </View>
      )}
    </View>
  );
}
