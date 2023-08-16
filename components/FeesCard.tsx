import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { IFee } from "../interfaces";
import Checkbox from "expo-checkbox";
import clsx from "clsx";

const FeeCard = ({
  feeData,
  onChange,
}: {
  feeData: IFee;
  onChange: (selected: boolean) => void;
}) => {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <Pressable
      onPress={() => {
        onChange(!isSelected);
        setIsSelected(!isSelected);
      }}
      className={clsx(
        "p-8 py-6 mb-2 border flex-row",
        isSelected
          ? "bg-blue-100 border-blue-200"
          : "border-gray-200 bg-gray-100"
      )}
      key={feeData.id}
    >
      <Checkbox
        className="mr-4"
        value={isSelected}
        onValueChange={() => {
          onChange(!isSelected);
          setIsSelected(!isSelected);
        }}
      />
      <View className="flex-col">
        <Text>{feeData.fee}</Text>
        <Text>{feeData.amount}</Text>
      </View>
    </Pressable>
  );
};

export { FeeCard };
