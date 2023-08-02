import * as React from "react";

import { cn } from "../lib/utils";
import { Text, TextInput, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

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
  const handleOpenPicker = async () => {
    DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
  };
  return (
    <TouchableOpacity>
      <Text>Open</Text>
    </TouchableOpacity>
  );
};

Picker.displayName = "Picker";

export { Picker };
