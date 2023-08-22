import { Link } from "expo-router";
import React, { ReducerWithoutAction, useContext } from "react";
import { AuthContext } from "../../layouts/AuthProvider";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "../Picker";
import { Input } from "../Input";
import { IFileData, IProfile } from "../../interfaces";
import { FilePicker } from "../FilePicker";
import { convertFileToBase64 } from "../../lib/utils";
import { uploadFile } from "../../lib/FileStorage";
import { useQuery } from "../../hooks/useQuery";
import { getLGAs, getStates, getTitles } from "../../services/ProfileService";

export interface MainInfoProps {
  className?: string;
  profileDetails: IProfile;
  updateProfileDetails: (state: {
    name: keyof IProfile;
    payload: string;
  }) => void;
}

const MainInfo = ({
  className,
  profileDetails,
  updateProfileDetails,
}: MainInfoProps) => {
  const [passport, setPassport] = React.useState<IFileData>(null);
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    if (passport && passport.type === "success") {
      console.log({ passport });
    }
  }, [passport]);

  React.useEffect(() => {
    if (passport && passport.type === "success") {
      console.log({ passport });
    }
  }, [profileDetails.state]);

  const [lgas, setLGAs] = React.useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const lgasQuery = useQuery(
    async () => {
      console.log("why here");
      const res = await getLGAs(profileDetails?.state ?? "1");
      return res.data;
    },
    {
      queryKey: [profileDetails.state],
      onSuccessFunction: (data) => {
        console.log({ data: data.lga });
        setLGAs(
          data.lga.map((lga) => ({
            value: lga.lga.toString(),
            label: lga.lga,
          }))
        );
      },

      onErrorFunction: (error) => {
        console.log({ error: error });
      },
      // isDisabled: !token,
    }
  );
  const [states, setStates] = React.useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const statesQuery = useQuery(
    async () => {
      console.log("why here");
      const res = await getStates();
      return res.data;
    },
    {
      onSuccessFunction: (data) => {
        console.log({ data: data.data });
        setStates(
          data.data.map((state) => ({
            value: state.id.toString(),
            label: state.state,
          }))
        );
      },

      onErrorFunction: (error) => {
        console.log({ error: error });
      },
      // isDisabled: !token,
    }
  );

  return (
    <>
      <View className="flex-1 pt-24 pb-12">
        <View className="flex flex-row items-center">
          <Text className="text-2xl text-primary">Let's get you setup</Text>
        </View>
        <Text className="mt-4 text-base text-gray-400">
          Now that you're a verified student of NDU, you need to set up your
          college profile{" "}
        </Text>
      </View>
      <View className="">
        <View className="mb-6">
          <Text className="text-base text-gray-400">First Name</Text>
          <Input
            placeholder="First Name"
            disabled
            variant="disabled"
            classNames="mt-2"
            value={user.firstname}
          />
        </View>
        <View className="mb-6">
          <Text className="text-base text-gray-400">Last Name</Text>
          <Input
            placeholder="Last Name"
            value={user.surname}
            disabled
            variant="disabled"
            classNames="mt-2"
          />
        </View>
        <View className="mb-6">
          <Text className="text-base text-gray-400">Mat. No.</Text>
          <Input
            placeholder="Mat. No."
            value={user.matno}
            disabled
            variant="disabled"
            classNames="mt-2"
          />
        </View>
        <View>
          <Text className="mb-2 text-base text-gray-400">Passport</Text>
          <FilePicker
            type="image/*"
            value={passport}
            onChange={async (value) => {
              if (!value || value.type === "cancel") {
                setPassport(null);
                return;
              }
              // if
              uploadFile(value)
                .then((res) => {
                  // console.log({ res: res });
                  updateProfileDetails({
                    name: "profilePhoto",
                    payload: res.data,
                  });
                })
                .catch((err) => {
                  console.log({ err });
                });
              setPassport(value);
            }}
          />
        </View>
        <View className="mb-6">
          <Text className="text-base text-gray-800">Email Address</Text>
          <Input
            placeholder="Email Address"
            onChange={(value) => {
              updateProfileDetails({
                name: "email",
                payload: value,
              });
            }}
            value={profileDetails.email}
            classNames="mt-2"
          />
        </View>
        <View className="mb-6">
          <Text className="text-base text-gray-800">Phone Number</Text>
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

        <View className="mt-4">
          <Text className="mb-2 text-base text-gray-800">State of Origin</Text>
          <Picker
            placeholder="State of Origin"
            value={profileDetails.state}
            onChange={(value) => {
              updateProfileDetails({
                name: "state",
                payload: value,
              });
            }}
            items={states}
          />
        </View>
        <View className="mt-4">
          <Text className="mb-2 text-base text-gray-800">LGA</Text>
          <Picker
            value={profileDetails.lga}
            onChange={(value) => {
              updateProfileDetails({
                name: "lga",
                payload: value,
              });
            }}
            placeholder="LGA"
            items={lgas}
          />
        </View>
        <View className="mt-4">
          <Text className="mb-2 text-base text-gray-800">Disability</Text>
          <Picker
            value={profileDetails.disabled}
            onChange={(value) => {
              updateProfileDetails({
                name: "disabled",
                payload: value,
              });
            }}
            placeholder="Disability"
            items={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
          />
        </View>
      </View>
    </>
  );
};

export { MainInfo };
