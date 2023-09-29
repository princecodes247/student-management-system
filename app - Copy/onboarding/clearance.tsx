import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useRouter } from "expo-router";
import { Picker } from "../../components/Picker";
import {
  IFileData,
  IProfile,
  IProfileGuardian,
  IUpdateProfileData,
} from "../../interfaces";
import { updateProfile } from "../../services/AuthService";
import { FilePicker } from "../../components/FilePicker";
import { uploadFile } from "../../lib/FileStorage";
import { useMutate } from "../../hooks/useMutate";
import { AuthContext } from "../../layouts/AuthProvider";
import { InAppRoutes } from "../../constants";

export default function Clearance() {
  const { logout } = useContext(AuthContext);
  const [profileDetails, updateProfileDetails] = React.useReducer<
    (
      state: IProfileGuardian,
      action: { name: keyof IProfileGuardian; payload: string }
    ) => IProfileGuardian
  >(
    (state, action) => {
      return {
        ...state,
        [action.name]: action.payload,
      };
    },
    {
      guardian_title: "",
      guardian_firstname: "",
      guardian_surname: "",
      guardian_email: "",
      guardian_mobile: "",
      guardian_alt_phone: "",
    }
  );
  const [passport, setPassport] = React.useState<IFileData>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const updateProfileMutation = useMutate(updateProfile, {
    onSuccessFunction: (data) => {
      console.log({ data });
    },
  });
  return (
    <ScrollView className="">
      <View className="flex justify-start flex-1 gap-4 p-8 ">
        <View className="flex-1 pt-24">
          <Text className="text-2xl text-primary">Complete your Profile</Text>
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
        <View className="flex-1">
          <Button
            // replace
            // href="/onboarding/clearance"
            onClick={() => {
              updateProfileMutation.mutate(profileDetails);
            }}
            loading={isLoading}
            classNames="w-full"
            variant="default"
          >
            Continue
          </Button>
        </View>
        <View className="">
          <Button
            onClick={() => {
              router.replace(InAppRoutes.login);
              logout();
            }}
          >
            <Text className="text-center text-red-600">Logout</Text>
          </Button>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
