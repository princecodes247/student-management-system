import * as React from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { cn } from "../lib/utils";
import { View, Text, TextInput } from "react-native";

export interface BottomSheetModalProps {
  title?: string;
  placeholder?: string;
  style?: any;
  children?: React.ReactNode;
  innerRef?: React.RefObject<BottomSheet>;
}

const BottomSheetModal = ({
  title,
  style = {},
  children,
  innerRef,
  ...props
}: BottomSheetModalProps) => {
  const [index, setIndex] = React.useState<number>(-1);
  // variables
  const snapPoints = React.useMemo(() => ["30%", "55%", "85%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.2}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={innerRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      {children}
    </BottomSheet>
  );
};

BottomSheetModal.displayName = "BottomSheetModal";

export { BottomSheetModal };
