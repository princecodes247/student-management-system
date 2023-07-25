import * as React from "react";

import { cn } from "../../lib/utils";
import { View, Text } from "react-native";
import Button from "../Button";
import { Picker } from "../Picker";

export interface SelectPaymentMethodProps {
  classNames: string;
  placeholder: string;
}

const SelectPaymentMethod = ({
  classNames,
  placeholder,
}: SelectPaymentMethodProps) => {
  return (
    <View className="flex-1">
      <Text>Select Payment Method</Text>
      <View>
        <Text>Paystack</Text>
        <Text>Flutterwave</Text>
      </View>
      <Button
        replace
        href="/onboarding/congratulations"
        classNames="w-full"
        variant="default"
      >
        <Text className="text-primary-foreground">Continue</Text>
      </Button>
    </View>
  );
};

SelectPaymentMethod.displayName = "SelectPaymentMethod";

export { SelectPaymentMethod };
