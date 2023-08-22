import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { cn } from "../lib/utils";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export interface FilePickerProps {
  className?: string;
  placeholder?: string;
  type?: string;
  value?: DocumentPicker.DocumentResult | null;
  onChange?: (value: DocumentPicker.DocumentResult | null) => void;
  items?: {
    label: string;
    value: string;
  }[];
}

const FilePicker = ({
  className,
  placeholder = "Choose an option",
  items = [],
  value,
  type,
  onChange,
  ...props
}: FilePickerProps) => {
  const [pickerValue, setPickerValue] =
    React.useState<DocumentPicker.DocumentResult | null>(null);
  const handleOpenPicker = async () => {
    const doc = await DocumentPicker.getDocumentAsync({
      type: type ?? "application/pdf",
      copyToCacheDirectory: true,
    });
    console.log({ doc });
    if (doc.type === "success") {
      onChange?.(doc);
      setPickerValue(doc);
    } else {
      onChange?.(null);
      setPickerValue(null);
    }
    console.log({ doc });
  };
  return (
    <>
      {pickerValue && value && value.type === "success" ? (
        <TouchableOpacity
          className="flex-row items-center justify-between p-5 mb-4 bg-gray-200 border border-gray-300 rounded-xl"
          onPress={() => {
            onChange?.(null);
            setPickerValue(null);
          }}
        >
          <Text className="text-base text-gray-400">{value.name}</Text>
          <Text className="text-gray-400">
            <MaterialIcons name="close" size={24} />
          </Text>
        </TouchableOpacity>
      ) : pickerValue && pickerValue.type === "success" ? (
        <View className="flex-row items-center justify-between p-5 mb-4 bg-gray-200 border border-gray-300 rounded-xl">
          <Text className="text-base text-gray-400">Uploading...</Text>
        </View>
      ) : (
        <TouchableOpacity
          className="flex-row items-center p-5 mb-4 bg-gray-200 border border-gray-300 rounded-xl"
          onPress={handleOpenPicker}
        >
          <MaterialIcons name="file-upload" size={24} color="gray" />
          <Text className="ml-2 text-base text-gray-500">
            Tap here to upload Document{" "}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

FilePicker.displayName = "FilePicker";

export { FilePicker };
