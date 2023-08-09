import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { IFee } from "../interfaces";
import clsx from "clsx";

const FeeCard = ({ feeData }: { feeData: IFee }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <Pressable
      onPress={() => setIsSelected(!isSelected)}
      className={clsx(
        "p-8 py-6 mb-2 border",
        isSelected
          ? "bg-blue-100 border-blue-200"
          : "border-gray-200 bg-gray-100"
      )}
      key={feeData.id}
    >
      <Text>{feeData.fee}</Text>
      <Text>{feeData.amount}</Text>
    </Pressable>
  );
};

export { FeeCard };
