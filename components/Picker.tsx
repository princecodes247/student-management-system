import * as React from "react";

import { cn } from "../lib/utils";
import { TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export interface PickerProps<T> {
  className?: string;
  placeholder?: string;
  value: T;
  onChange?: (value: string) => void;
  items?: {
    label: string;
    value: T | null;
  }[];
}

function Picker<T>({
  className,
  placeholder = "Choose an option",
  items = [],
  value,
  onChange = () => {},
  ...props
}: PickerProps<T>) {
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
          backgroundColor: "#f5f5f5",
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          // borderWidth: 1,
          // borderColor: "#aaa",
        },
      }}
      items={items}
    />
  );
}

Picker.displayName = "Picker";

export { Picker };
