import React, { ReducerWithoutAction } from "react";
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
  IProfilePassword,
  IUpdateProfileData,
} from "../../interfaces";
import { updateProfile } from "../../services/AuthService";
import { FilePicker } from "../../components/FilePicker";
import { uploadFile } from "../../lib/FileStorage";
import { useMutate } from "../../hooks/useMutate";

export default function Clearance() {
  const [profileDetails, updateProfileDetails] = React.useReducer<
    (
      state: IProfilePassword,
      action: { name: keyof IProfilePassword; payload: string }
    ) => IProfilePassword
  >(
    (state, action) => {
      return {
        ...state,
        [action.name]: action.payload,
      };
    },
    {
      password: "",
      confirm_password: "",
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
          <Link asChild href="/login">
            <Text className="text-center">
              Already have an account?{" "}
              <Text className="text-primary">Login </Text>
            </Text>
          </Link>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
