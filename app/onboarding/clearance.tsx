import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "expo-router";
import { FilePicker } from "../../components/FilePicker";
import { uploadFile } from "../../lib/FileStorage";
import * as DocumentPicker from "expo-document-picker";
import { ScrollView } from "react-native-gesture-handler";
import { IFileData } from "../../interfaces";

export default function Clearance() {
  const [olevel, setOlevel] = React.useState<IFileData>(null);
  const [statutoryDeclaration, setStatutoryDeclaration] =
    React.useState<IFileData>(null);
  const [birthCertificate, setBirthCertificate] =
    React.useState<IFileData>(null);
  const [jambResult, setJambResult] = React.useState<IFileData>(null);
  const [attestationLetter, setAttestationLetter] =
    React.useState<IFileData>(null);
  return (
    <ScrollView>
      <View className="flex justify-start flex-1 gap-4 p-8">
        <View className="flex-1 pt-24">
          <Text className="text-2xl text-primary">You're almost done!</Text>
          <Text className="mt-4 text-base text-gray-400">
            Not to worry, we are saving you alot of stress, perhaps Hours of
            walking under the Hot sun
          </Text>
        </View>
        <View className="flex-[4]">
          <View>
            <Text className="mb-2 text-base text-gray-400">O'level result</Text>
            <FilePicker
              value={olevel}
              onChange={async (value) => {
                const res = await uploadFile(value).catch((err) => {
                  console.log({ err });
                  setOlevel(null);
                });
                setOlevel({
                  ...value,
                  url: res?.url ?? null,
                });
                console.log({ res });
              }}
            />
          </View>
          <View>
            <Text className="mb-2 text-base text-gray-400">
              Statutory Declaration
            </Text>
            <FilePicker
              value={statutoryDeclaration}
              onChange={async (value) => {
                const res = await uploadFile(value);
                console.log({ res });
                setStatutoryDeclaration({
                  ...value,
                  url: res?.url ?? null,
                });
              }}
            />
          </View>
          <View>
            <Text className="mb-2 text-base text-gray-400">
              Birth Certificate
            </Text>
            <FilePicker
              value={birthCertificate}
              onChange={async (value) => {
                const res = await uploadFile(value);
                console.log({ res });
                setBirthCertificate(res?.url ?? null);
              }}
            />
          </View>
          <View>
            <Text className="mb-2 text-base text-gray-400">Jamb result</Text>
            <FilePicker
              value={jambResult}
              onChange={async (value) => {
                const res = await uploadFile(value);
                console.log({ res });
                setJambResult(res?.url ?? null);
              }}
            />
          </View>
          <View>
            <Text className="mb-2 text-base text-gray-400">
              Letter of Attestation
            </Text>
            <FilePicker
              value={attestationLetter}
              onChange={async (value) => {
                const res = await uploadFile(value);
                console.log({ res });
                setAttestationLetter(res?.url ?? null);
              }}
            />
          </View>

          <Button classNames="w-full" variant="default">
            <Text className="text-primary-foreground">Continue</Text>
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
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
