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

export interface CheckResultProps {
  classNames?: string;
  navigation: any;
}

const CheckResult = ({ classNames, navigation }: CheckResultProps) => {
  const paymentModalRef = React.useRef<BottomSheet>(null);
  const handleOpenPaymentModal = () => {
    if (paymentModalRef.current) paymentModalRef.current.collapse();
  };
  const handleOnSuccessfulPayment = () => {
    navigation.jumpTo("Saved Results");
  };

  return (
    <View className="flex-1 p-6 bg-white">
      <View className="my-3">
        <Input value="UG/17/0000" variant="disabled" disabled />
      </View>
      <View className="flex-row justify-between gap-2 my-4">
        <View className="flex-1">
          {/* <Picker
            placeholder="Choose Level"
            items={[
              { label: "100 level", value: "100l" },
              { label: "200 level", value: "200l" },
              { label: "300 level", value: "300l" },
            ]}
            value={"100l"}
          /> */}
        </View>
        <View className="flex-1">
          {/* <Picker
            placeholder="Select Semester"
            items={[
              { label: "1st semester", value: "1" },
              { label: "2nd semester", value: "2" },
            ]}
            value={"1"}
          /> */}
        </View>
      </View>

      <Text className="my-4">
        Note that the result check payment amount is subject to change due to
        institutional policies.
      </Text>

      <Button
        classNames="w-full"
        onClick={handleOpenPaymentModal}
        variant="default"
      >
        Pay #350
      </Button>

      <PaymentModal
        firstRef={paymentModalRef}
        onSuccess={handleOnSuccessfulPayment}
        amount={350}
      />
    </View>
  );
};

CheckResult.displayName = "CheckResult";

export { CheckResult };
