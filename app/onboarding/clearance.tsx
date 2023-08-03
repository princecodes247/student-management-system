import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useRouter } from "expo-router";
import { FilePicker } from "../../components/FilePicker";
import { uploadFile } from "../../lib/FileStorage";
import * as DocumentPicker from "expo-document-picker";
import { ScrollView } from "react-native-gesture-handler";
import { IFileData, IUser, UserRole } from "../../interfaces";
import { uploadDocs } from "../../services/ProfileService";
import { AuthContext } from "../../layouts/AuthProvider";
import AuthorizedRoute from "../../layouts/AuthorizedRoute";

export default function Clearance() {
  const { getUser } = useContext(AuthContext);
  const [user, setUser] = React.useState<IUser>(null);
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, []);

  const [olevel_result, setOlevelResult] = React.useState<IFileData>(null);
  const [statutory_declaration, setStatutoryDeclaration] =
    React.useState<IFileData>(null);
  const [birth_certificate, setBirthCertificate] =
    React.useState<IFileData>(null);
  const [jamb_result, setJambResult] = React.useState<IFileData>(null);
  const [attestation_letter, setAttestationLetter] =
    React.useState<IFileData>(null);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const profileMutation = uploadDocs({
    onSuccess: () => {
      setLoading(false);
      console.log("success");
      router.push("/home");
    },
    onMutate: () => {
      setLoading(true);
      console.log("mutate");
    },
    onError: () => {
      setLoading(false);
      console.log("error");
    },
  });

  return (
    <AuthorizedRoute allowedRoles={[UserRole.Student]}>
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
              <Text className="mb-2 text-base text-gray-400">
                O'level result
              </Text>
              <FilePicker
                value={olevel_result}
                onChange={async (value) => {
                  const res = await uploadFile(value).catch((err) => {
                    console.log({ err });
                    setOlevelResult(null);
                  });
                  setOlevelResult({
                    ...value,
                    url: res?.data?.url ?? null,
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
                value={statutory_declaration}
                onChange={async (value) => {
                  const res = await uploadFile(value).catch((err) => {
                    console.log({ err });
                    setStatutoryDeclaration(null);
                  });
                  console.log({ res });
                  setStatutoryDeclaration({
                    ...value,
                    url: res?.data?.url ?? null,
                  });
                }}
              />
            </View>
            <View>
              <Text className="mb-2 text-base text-gray-400">
                Birth Certificate
              </Text>
              <FilePicker
                value={birth_certificate}
                onChange={async (value) => {
                  const res = await uploadFile(value).catch((err) => {
                    console.log({ err });
                    setBirthCertificate(null);
                  });
                  console.log({ res });
                  setBirthCertificate({
                    ...value,
                    url: res?.data?.url ?? null,
                  });
                }}
              />
            </View>
            <View>
              <Text className="mb-2 text-base text-gray-400">Jamb result</Text>
              <FilePicker
                value={jamb_result}
                onChange={async (value) => {
                  const res = await uploadFile(value).catch((err) => {
                    console.log({ err });
                    setJambResult(null);
                  });
                  console.log({ res });
                  setJambResult({ ...value, url: res?.data?.url ?? null });
                }}
              />
            </View>
            <View>
              <Text className="mb-2 text-base text-gray-400">
                Letter of Attestation
              </Text>
              <FilePicker
                value={attestation_letter}
                onChange={async (value) => {
                  const res = await uploadFile(value).catch((err) => {
                    console.log({ err });
                    setAttestationLetter(null);
                  });
                  console.log({ res });
                  setAttestationLetter({
                    ...value,
                    url: res?.data?.url ?? null,
                  });
                }}
              />
            </View>

            <Button
              onClick={() => {
                profileMutation.mutate({
                  user_id: user.id,
                  olevel_result: olevel_result?.url,
                  statutory_declaration: statutory_declaration?.url,
                  birth_certificate: birth_certificate?.url,
                  jamb_result: jamb_result?.url,
                  attestation_letter: attestation_letter?.url,
                });
              }}
              classNames="w-full"
              variant="default"
              loading={loading}
            >
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
    </AuthorizedRoute>
  );
}
