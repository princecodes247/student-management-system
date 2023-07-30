import * as React from "react";

import { cn } from "../../lib/utils";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input } from "../../components/Input";
import { Picker } from "../../components/Picker";
import Button from "../../components/Button";
import { PaymentModal } from "../../components/modals/payment";

export default function CourseEnrollment() {
  const paymentModalRef = React.useRef<BottomSheet>(null);
  const handleOpenPaymentModal = () => {
    if (paymentModalRef.current) paymentModalRef.current.collapse();
  };

  return (
    <View className="flex-1 p-6 bg-white">
      <View className="flex-1">
        <View className="my-3">
          <Text className="">
            Choose the session courses you want to register
          </Text>
        </View>
        <View className="flex-col justify-between gap-2 my-4">
          <View className="">
            <Picker
              placeholder="Choose Level"
              items={[
                { label: "100 level", value: "100l" },
                { label: "200 level", value: "200l" },
                { label: "300 level", value: "300l" },
              ]}
            />
          </View>
          <View className="">
            <Picker
              placeholder="Select Semester"
              items={[
                { label: "1st semester", value: "1" },
                { label: "2nd semester", value: "2" },
              ]}
            />
          </View>
        </View>
        <View className="my-3 mt-8 ">
          <Input
            value="UG/17/0000"
            classNames="mb-2"
            variant="disabled"
            disabled
          />
          <Input
            value="Electrical/Electronics Engineering"
            variant="disabled"
            disabled
          />
        </View>
      </View>

      <Button
        classNames="w-full"
        onClick={handleOpenPaymentModal}
        variant="outline"
      >
        <Text className="font-semibold text-primary">Pay #350</Text>
      </Button>

      <PaymentModal firstRef={paymentModalRef} amount={100} />
    </View>
  );
}
