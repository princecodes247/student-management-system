import { Text, View, Pressable, Alert } from "react-native";

type AlertButtonType = {
  text: string;
  onPress: () => void;
  style: "cancel" | "destructive" | "default";
};

const show = (title: string, description: string, buttons: AlertButtonType[]) =>
  Alert.alert(title, description, buttons, {
    cancelable: true,
  });

export const AlertBox = {
  show,
};
