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
import { getFees, payFees } from "../../services/SchoolFeesService";
import { AuthContext } from "../../layouts/AuthProvider";
import formatMatNo from "../../lib/formatMatNo";
import { FeeCard } from "../../components/FeesCard";
import { useMutate } from "../../hooks/useMutate";

export default function SchoolFees() {
  const { user, token } = useContext(AuthContext);
  const fees = useQuery(
    async () => {
      console.log("why here");
      const res = await getFees(formatMatNo(user.matno), 100);
      return [...res.data.fees];
    },
    {
      onSuccessFunction: (data) => {
        console.log({ data });
      },
      // isDisabled: !token,
    }
  );

  const payFeesMutation = useMutate(payFees, {
    onSuccessFunction: (data) => {
      console.log({ data });
    },
  });

  return (
    <ScrollView className="bg-white">
      <View className="flex-1 h-full p-6 ">
        <View className="flex-1">
          <View className="my-3">
            <Text className="text-base text-gray-500">
              Your fees for the level semester
            </Text>
          </View>
        </View>

        <View className="flex-1 pt-8 pb-8">
          <Text className="mt-8 mb-4 text-xl font-semibold">School Fees</Text>
          {fees.isLoading ? (
            <View>
              <Text>Loading</Text>
            </View>
          ) : !fees.isLoading && fees?.data?.length > 0 ? (
            <View>
              {React.Children.toArray(
                fees.data.map((item) => (
                  <FeeCard feeData={item} key={item.id} />
                ))
              )}
            </View>
          ) : (
            <View className="py-6">
              <Text className="text-center text-gray-500">No fees yet</Text>
            </View>
          )}
        </View>
        <View>
          <Button
            onClick={() =>
              payFeesMutation.mutate({
                totalAmount: "1000",
                level: "100",
                feeIds: [2, 3],
              })
            }
          >
            <Text className="text-base text-white">Pay Fees</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
