import * as React from "react";

import { cn } from "../lib/utils";
import { TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export interface PickerProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  items?: {
    label: string;
    value: string;
  }[];
}

const Picker = ({
  className,
  placeholder = "Choose an option",
  items = [],
  value,
  onChange,
  ...props
}: PickerProps) => {
  return (
    <RNPickerSelect
      value={value}
      onValueChange={onChange}
      placeholder={{
        label: placeholder,
        value: null,
      }}
      style={{
        inputIOS: {
          color: "black",
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "#aaa",
        },
      }}
      items={items}
    />
  );
};

Picker.displayName = "Picker";

export { Picker };
