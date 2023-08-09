import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "../Picker";
import { Input } from "../Input";
import { IFileData, IProfile } from "../../interfaces";
import { FilePicker } from "../FilePicker";

export interface PasswordInfoProps {
  className?: string;
  profileDetails: IProfile;
  updateProfileDetails: (state: {
    name: keyof IProfile;
    payload: string;
  }) => void;
}

const PasswordInfo = ({
  className,
  profileDetails,
  updateProfileDetails,
}: PasswordInfoProps) => {
  const [passport, setPassport] = React.useState<IFileData>(null);

  return (
    <>
      <View className="flex-1 pt-24 pb-12">
        <Text className="text-2xl text-primary">Complete your Profile</Text>
        <Text className="mt-4 text-base text-gray-400">
          Setup your passwords
        </Text>
      </View>
      <View className="">
        <View className="mb-6">
          <Text className="text-base text-gray-600">Password</Text>
          <Input
            placeholder="Password"
            onChange={(value) => {
              updateProfileDetails({
                name: "password",
                payload: value,
              });
            }}
            value={profileDetails.password}
            classNames="mt-2"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-600">Confirm Password</Text>
          <Input
            placeholder="Confirm Password"
            onChange={(value) => {
              updateProfileDetails({
                name: "confirm_password",
                payload: value,
              });
            }}
            value={profileDetails.confirm_password}
            classNames="mt-2"
          />
        </View>
      </View>
    </>
  );
};

export { PasswordInfo };
