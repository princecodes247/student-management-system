import React, { ReducerWithoutAction } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useRouter } from "expo-router";
import { Picker } from "../../components/Picker";
import { IUpdateProfileData } from "../../interfaces";
import { updateProfile } from "../../services/AuthService";

export default function CreateAccount() {
  const [profileDetails, updateProfileDetails] = React.useReducer<
    (
      state: IUpdateProfileData,
      action: { name: keyof IUpdateProfileData; payload: string }
    ) => IUpdateProfileData
  >(
    (state, action) => {
      return {
        ...state,
        [action.name]: action.payload,
      };
    },
    {
      phone: "",
      mothersName: "",
      nationality: "",
      stateOfOrigin: "",
      lga: "",
      address: "",
    }
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const updateProfileMutation = updateProfile({
    onMutate: (data) => {
      setIsLoading(true);
    },
    onError: (error) => {
      setIsLoading(false);
    },

    onSuccess: (data) => {
      setIsLoading(false);
      console.log("I did it", data);
      router.push("/onboarding/clearance");
    },
  });
  return (
    <ScrollView className="">
      <View className="flex justify-start flex-1 gap-4 p-8 ">
        <View className="flex-1 pt-24">
          <Text className="text-2xl text-primary">Let's get you setup</Text>
          <Text className="mt-4 text-base text-gray-400">
            Now that you’re a verified student of NDU, you need to set up your
            college profile{" "}
          </Text>
        </View>
        <View className="">
          <View className="mb-6">
            <Text className="text-base text-gray-400">First Name</Text>
            <Input
              placeholder="First Name"
              value=""
              disabled
              variant="disabled"
              classNames="mt-2"
            />
          </View>
          <View className="mb-6">
            <Text className="text-base text-gray-400">Last Name</Text>
            <Input
              placeholder="Last Name"
              value=""
              disabled
              variant="disabled"
              classNames="mt-2"
            />
          </View>
          <View className="mb-6">
            <Text className="text-base text-gray-400">Jamb Reg. No.</Text>
            <Input
              placeholder="Jamb Reg. No."
              value=""
              disabled
              variant="disabled"
              classNames="mt-2"
            />
          </View>
          <View className="mb-6">
            <Text className="text-base text-gray-400">Email Address</Text>
            <Input
              placeholder="Email Address"
              value=""
              disabled
              variant="disabled"
              classNames="mt-2"
            />
          </View>
          <View className="mb-6">
            <Text className="text-base text-gray-600">Phone Number</Text>
            <Input
              placeholder="Phone Number"
              onChange={(value) => {
                updateProfileDetails({
                  name: "phone",
                  payload: value,
                });
              }}
              value={profileDetails.phone}
              classNames="mt-2"
            />
          </View>
          <View className="mb-6">
            <Text className="text-base text-gray-600">Mother's Name</Text>
            <Input
              placeholder="Mother's Name"
              onChange={(value) => {
                updateProfileDetails({
                  name: "mothersName",
                  payload: value,
                });
              }}
              value={profileDetails.mothersName}
              classNames="mt-2"
            />
          </View>
          <View className="">
            <Text className="mb-2 text-base text-gray-600">Nationality</Text>
            <Picker
              value={profileDetails.nationality}
              onChange={(value) => {
                updateProfileDetails({
                  name: "nationality",
                  payload: value,
                });
              }}
              placeholder="Choose your nationality"
              items={[{ label: "Nigeria", value: "Nigeria" }]}
            />
          </View>
          <View className="mt-4">
            <Text className="mb-2 text-base text-gray-600">
              State of Origin
            </Text>
            <Picker
              placeholder="State of Origin"
              value={profileDetails.stateOfOrigin}
              onChange={(value) => {
                updateProfileDetails({
                  name: "stateOfOrigin",
                  payload: value,
                });
              }}
              items={[{ label: "Nigeria", value: "Nigeria" }]}
            />
          </View>
          <View className="mt-4">
            <Text className="mb-2 text-base text-gray-600">LGA</Text>
            <Picker
              value={profileDetails.lga}
              onChange={(value) => {
                updateProfileDetails({
                  name: "lga",
                  payload: value,
                });
              }}
              placeholder="LGA"
              items={[{ label: "Nigeria", value: "Nigeria" }]}
            />
          </View>
          <View className="mb-6">
            <Text className="text-base text-gray-600">Address</Text>
            <Input
              value={profileDetails.address}
              onChange={(value) => {
                updateProfileDetails({
                  name: "address",
                  payload: value,
                });
              }}
              placeholder="Address"
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
