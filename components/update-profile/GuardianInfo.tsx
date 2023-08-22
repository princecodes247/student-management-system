import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "../Picker";
import { Input } from "../Input";
import { IFileData, IProfile } from "../../interfaces";
import { FilePicker } from "../FilePicker";

export interface GuardianInfoProps {
  className?: string;
  profileDetails: IProfile;
  updateProfileDetails: (state: {
    name: keyof IProfile;
    payload: string;
  }) => void;
  button: React.ReactNode;
}

const GuardianInfo = ({
  className,
  profileDetails,
  updateProfileDetails,
  button,
}: GuardianInfoProps) => {
  const [passport, setPassport] = React.useState<IFileData>(null);

  return (
    <>
      <View className="flex-1 pt-24 pb-12">
        <View className="flex flex-row items-center">
          {button}

          <Text className="text-2xl text-primary">Complete your Profile</Text>
        </View>
        <Text className="mt-4 text-base text-gray-400">
          Input your Guardian Details
        </Text>
      </View>
      <View className="">
        <View className="mb-6">
          <Text className="text-base text-gray-600">Guardian Title</Text>
          <Input
            placeholder="Guardian Title"
            onChange={(value) => {
              updateProfileDetails({
                name: "guardian_title",
                payload: value,
              });
            }}
            value={profileDetails.guardian_title}
            classNames="mt-2"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-600">First Name</Text>
          <Input
            placeholder="First Name"
            onChange={(value) => {
              updateProfileDetails({
                name: "guardian_firstname",
                payload: value,
              });
            }}
            value={profileDetails.guardian_firstname}
            classNames="mt-2"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-600">Last Name</Text>
          <Input
            placeholder="Last Name"
            onChange={(value) => {
              updateProfileDetails({
                name: "guardian_surname",
                payload: value,
              });
            }}
            value={profileDetails.guardian_surname}
            classNames="mt-2"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-600">Mobile Number</Text>
          <Input
            placeholder="Mobile Number"
            onChange={(value) => {
              updateProfileDetails({
                name: "guardian_mobile",
                payload: value,
              });
            }}
            value={profileDetails.guardian_mobile}
            classNames="mt-2"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-600">Alternate Number</Text>
          <Input
            placeholder="Alternate Number"
            onChange={(value) => {
              updateProfileDetails({
                name: "guardian_alt_phone",
                payload: value,
              });
            }}
            value={profileDetails.guardian_alt_phone}
            classNames="mt-2"
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-600">Guardian Email</Text>
          <Input
            placeholder="Guardian Email"
            onChange={(value) => {
              updateProfileDetails({
                name: "guardian_email",
                payload: value,
              });
            }}
            value={profileDetails.guardian_email}
            classNames="mt-2"
          />
        </View>
      </View>
    </>
  );
};

export { GuardianInfo };
