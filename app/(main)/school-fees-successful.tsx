import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { useQuery } from "../../hooks/useQuery";
import {
  getFeesDetails,
  getFeesReport,
} from "../../services/SchoolFeesService";
import { useRouter, useSearchParams } from "expo-router";
import { useMutate } from "../../hooks/useMutate";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { IReceipt } from "../../interfaces/services";
import formatMatNo from "../../lib/formatMatNo";

export default function SchoolFeesSuccessful() {
  const params = useSearchParams();
  const [receipt, setReceipt] = React.useState<IReceipt>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const feesDetails = useQuery(
    async () => {
      const res = await getFeesDetails(params?.ref as string);
      return res.data.data;
    },
    {
      onSuccessFunction: (data) => {
        console.log({ data: data.matno });
        setReceipt(data);
        // getFeesReportMutation.mutate({
        //   level: 100,
        //   session: 2023,
        // });
      },
      onErrorFunction: (error) => {
        console.log({ error: error });
      },
      isDisabled: !params?.ref,
    }
  );

  const savePDFToLocal = async (blob) => {
    try {
      await requestPermission();
      if (permissionResponse.status !== "granted") {
        console.log({ permissionResponse });
        console.error("Permission not granted to write to external storage");
        return;
      }
      const uri =
        FileSystem.documentDirectory +
        `${formatMatNo(receipt.matno)}-${receipt.level}-receipt.pdf`;
      console.log({ uri });
      await FileSystem.writeAsStringAsync(uri, blob, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("passed");
      await Sharing.shareAsync(uri);
      return uri;
    } catch (error) {
      console.log("Error saving PDF to local storage:", error);
    }
  };

  const getFeesReportMutation = useMutate(getFeesReport, {
    onErrorFunction: (error) => {
      console.log({ error: error });
    },
    onSuccessFunction: async ({ data }) => {
      // console.log({ data: data });
      // console.log({ data });
      try {
        await savePDFToLocal(data);
        // console.log({ savedUri });
      } catch (error) {
        console.log({ error });
      }
    },
  });
  return (
    <View className="h-full p-6 bg-white">
      <View className="justify-between flex-1 py-8">
        <Text className="text-4xl text-primary">
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
              <Text className="">
                {feesDetails?.data?.matno ?? ""}{" "}
                {feesDetails?.data?.level ?? ""} level Fees
              </Text>
              <Text>{feesDetails?.data?.academicSession ?? ""}</Text>
            </View>
          </View>
          <Button
            loading={getFeesReportMutation.isLoading}
            onClick={() => {
              getFeesReportMutation.mutate({
                ref: params?.ref as string,
              });
            }}
            variant="default"
            classNames="mb-2"
          >
            Download Reciept
          </Button>
          <Button href={"/home"} variant="outline" classNames="border-2">
            Go Home
          </Button>
        </View>
      )}
    </View>
  );
}
