import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import Button from "../../components/Button";
import { Link, useRouter } from "expo-router";
import { IFileData, IProfile } from "../../interfaces";
import { updateProfile } from "../../services/AuthService";
import { useMutate } from "../../hooks/useMutate";
import { MainInfo } from "../../components/update-profile/MainInfo";
import { GuardianInfo } from "../../components/update-profile/GuardianInfo";
import { PasswordInfo } from "../../components/update-profile/PasswordInfo";
import { PageIndicator } from "../../components/update-profile/PageIndicator";
import { AuthContext } from "../../layouts/AuthProvider";
import { AxiosError, isAxiosError } from "axios";
import { AlertBox } from "../../lib/alert";
import { MaterialIcons } from "@expo/vector-icons";
import { InAppRoutes } from "../../constants";

export default function CreateAccount() {
  const { logout } = useContext(AuthContext);
  const [profileDetails, updateProfileDetails] = React.useReducer<
    (
      state: IProfile,
      action: { name: keyof IProfile; payload: string }
    ) => IProfile
  >(
    (state, action) => {
      return {
        ...state,
        [action.name]: action.payload,
      };
    },
    {
      surname: "",
      firstname: "",
      matno: "",
      profilePhoto: "",
      email: "",
      phone: "",
      othernames: "",
      gender: "Male",
      state: "",
      lga: "",
      disabled: "Yes",
      guardian_title: "",
      guardian_firstname: "",
      guardian_surname: "",
      guardian_email: "",
      guardian_mobile: "",
      guardian_alt_phone: "",
      password: "",
      confirm_password: "",
    }
  );
  const { user } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [passport, setPassport] = React.useState<IFileData>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const updateProfileMutation = useMutate(updateProfile, {
    onSuccessFunction: (data) => {
      console.log({ data });
    },
    onMutateFunction(payload) {
      console.log({ payload });
    },
    onErrorFunction: (error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        // Access to config, request, and response
        console.log(error?.response?.data);
        AlertBox.show(
          "Error",
          error?.response?.data?.error ?? "An error occurred",
          []
        );
      }
    },
  });
  return (
    <ScrollView className="">
      <View className="flex justify-start flex-1 gap-4 p-8 ">
        {/* <IndicatorViewPager
          // initialPage={3}
          // orientation="horizontal"
          indicator={<PageIndicator pageCount={1} />}
          className="flex justify-start flex-1 gap-4 p-8 border "
        > */}
        {/* <View key={1}> */}
        {currentSlide === 0 && (
          <MainInfo
            profileDetails={profileDetails}
            updateProfileDetails={updateProfileDetails}
          />
        )}
        {/* </View> */}
        {/* <View key="2"> */}
        {currentSlide === 1 && (
          <GuardianInfo
            button={
              <Button
                onClick={() => {
                  setCurrentSlide(currentSlide - 1);
                }}
                variant="ghost"
                textClassNames=""
              >
                <MaterialIcons
                  className="text-primary"
                  name="arrow-back"
                  size={24}
                  color="currentColor"
                />
              </Button>
            }
            profileDetails={profileDetails}
            updateProfileDetails={updateProfileDetails}
          />
        )}
        {/* </View> */}
        {/* <View key="3"> z*/}
        {currentSlide === 2 && (
          <PasswordInfo
            button={
              <Button
                onClick={() => {
                  setCurrentSlide(currentSlide - 1);
                }}
                variant="ghost"
                textClassNames=""
              >
                <MaterialIcons
                  className="text-primary"
                  name="arrow-back"
                  size={24}
                  color="currentColor"
                />
              </Button>
            }
            profileDetails={profileDetails}
            updateProfileDetails={updateProfileDetails}
          />
        )}
        {/* </View> */}
        {/* </IndicatorViewPager> */}
        <View className="flex-1">
          <Button
            // replace
            // href="/onboarding/clearance"
            onClick={() => {
              currentSlide === 2
                ? updateProfileMutation.mutate(profileDetails)
                : setCurrentSlide(currentSlide + 1);
            }}
            loading={isLoading}
            classNames="w-full"
            variant="default"
          >
            {currentSlide === 2 ? "Submit" : "Next"}
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
