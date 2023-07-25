import * as React from "react";

import { cn } from "../../lib/utils";
import { View, Text } from "react-native";
import Button from "../Button";
import { Picker } from "../Picker";
import { Input } from "../Input";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "../BottomSheet";
import KeyboardAvoidingView from "../KeyboardAvoidingView";

export interface CheckResultProps {
  classNames?: string;
}

const CheckResult = ({ classNames }: CheckResultProps) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const bottomSheetRef2 = React.useRef<BottomSheet>(null);
  const bottomSheetRef3 = React.useRef<BottomSheet>(null);
  const handleOpenBottomSheet = () => {
    if (bottomSheetRef.current) bottomSheetRef.current.collapse();
  };
  const handleOpenBottomSheet2 = () => {
    if (bottomSheetRef.current) bottomSheetRef.current.close();
    if (bottomSheetRef2.current) bottomSheetRef2.current.collapse();
  };
  const handleOpenBottomSheet3 = () => {
    if (bottomSheetRef2.current) bottomSheetRef2.current.close();
    if (bottomSheetRef3.current) bottomSheetRef3.current.collapse();
  };
  return (
    <View className="flex-1 p-6">
      <View className="my-3">
        <Input value="UG/17/0000" variant="disabled" disabled />
      </View>
      <View className="flex-row justify-between gap-2 my-4">
        <View className="flex-1">
          <Picker
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
          />
        </View>
        <View className="flex-1">
          <Picker
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
          />
        </View>
      </View>

      <Text className="my-4">
        Note that the result check payment amount is subject to change due to
        institutional policies.
      </Text>

      <Button
        classNames="w-full"
        onClick={handleOpenBottomSheet}
        variant="default"
      >
        <Text className="text-primary-foreground">Pay #350</Text>
      </Button>

      {/* First Payment modal */}
      <BottomSheetModal innerRef={bottomSheetRef}>
        <View className="flex-1 p-6">
          <Text className="text-xl font-semibold">Select Payment method</Text>

          <View className="flex gap-2 my-4"></View>

          <Button
            classNames="w-full"
            onClick={handleOpenBottomSheet2}
            variant="default"
          >
            <Text className="text-primary-foreground">Continue</Text>
          </Button>
        </View>
      </BottomSheetModal>
      {/* Second Payment modal */}
      <BottomSheetModal innerRef={bottomSheetRef2}>
        <View className="flex-1 p-6 ">
          <View className="mb-2">
            <Text className="text-lg font-semibold">Credit Card payment</Text>
            <View className="my-4">
              <View>
                <Text className="mb-2">Card Number*</Text>
                <Input />
              </View>
              <View className="flex flex-row gap-2 my-4">
                <View className="flex-1">
                  <Text className="mb-2">Expiry Date*</Text>
                  <Input />
                </View>
                <View className="flex-1">
                  <Text className="mb-2">Cvv*</Text>
                  <Input />
                </View>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView>
            <Button
              classNames="w-full "
              onClick={handleOpenBottomSheet3}
              variant="default"
            >
              <Text className="text-primary-foreground">Print Result</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </BottomSheetModal>

      <BottomSheetModal innerRef={bottomSheetRef3}>
        <View className="flex-1 p-6">
          <Text className="text-2xl font-semibold text-center">
            Payment Successful
          </Text>
          <Text className="my-4 text-sm text-center">
            Your payment was successful. You can now proceed to print your
            result.
          </Text>
          <Button
            classNames="w-full"
            onClick={() => bottomSheetRef.current.collapse()}
            variant="default"
          >
            <Text className="text-primary-foreground">Print Result</Text>
          </Button>
        </View>
      </BottomSheetModal>
    </View>
  );
};

CheckResult.displayName = "CheckResult";

export { CheckResult };
