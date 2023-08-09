import * as React from "react";

import { cn } from "../../../lib/utils";
import { View, Text } from "react-native";
import Button from "../../Button";
import { Picker } from "../../Picker";
import { Input } from "../../Input";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "../../BottomSheet";
import KeyboardAvoidingView from "../../KeyboardAvoidingView";

export interface PaymentModalProps {
  classNames?: string;
  firstRef: React.RefObject<BottomSheet>;
  amount?: number;
  onSuccess?: () => void;
}

const PaymentModal = ({
  classNames,
  firstRef,
  amount = 0,
  onSuccess,
}: PaymentModalProps) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const bottomSheetRef2 = React.useRef<BottomSheet>(null);
  const bottomSheetRef3 = React.useRef<BottomSheet>(null);

  const handleOpenBottomSheet2 = () => {
    if (firstRef.current) firstRef.current.close();
    if (bottomSheetRef2.current) bottomSheetRef2.current.expand();
  };
  const handleOpenBottomSheet3 = () => {
    if (bottomSheetRef2.current) bottomSheetRef2.current.close();
    if (bottomSheetRef3.current) bottomSheetRef3.current.collapse();
  };
  const handleFinalClose = () => {
    if (bottomSheetRef3.current) bottomSheetRef3.current.close();
    if (onSuccess) onSuccess();
  };
  return (
    <>
      <BottomSheetModal innerRef={firstRef}>
        <View className="flex-1 p-6">
          <Text className="text-xl font-semibold">Select Payment method</Text>

          <View className="flex gap-2 my-4"></View>

          <Button
            classNames="w-full"
            onClick={handleOpenBottomSheet2}
            variant="default"
          >
            Continue
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
              Pay #{amount}
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
            onClick={handleFinalClose}
            variant="default"
          >
            Print Result
          </Button>
        </View>
      </BottomSheetModal>
    </>
  );
};

PaymentModal.displayName = "PaymentModal";

export { PaymentModal };
