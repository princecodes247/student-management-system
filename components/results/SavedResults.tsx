import * as React from "react";

import { cn } from "../../lib/utils";
import { View, Text } from "react-native";
import Button from "../Button";
import { Picker } from "../Picker";
import { Input } from "../Input";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "../BottomSheet";
import KeyboardAvoidingView from "../KeyboardAvoidingView";
import { PaymentModal } from "../modals/payment";

export interface SavedResultsProps {
  classNames?: string;
}

const SavedResults = ({ classNames }: SavedResultsProps) => {
  return (
    <View className="flex-1 p-6 bg-white">
      <View className="flex-row justify-between gap-2 my-4">
        <View className="flex-1"></View>
        <View className="flex-1"></View>
      </View>

      <Text className="my-4">
        If you have disputes about your results kindly visit your HOD’s office
      </Text>
    </View>
  );
};

SavedResults.displayName = "SavedResults";

export { SavedResults };
