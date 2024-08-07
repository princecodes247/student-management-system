import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import { PaymentModal } from "../../components/modals/payment";
import { AuthContext } from "../../layouts/AuthProvider";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ICourse } from "../../interfaces";
import { Link, useRouter } from "expo-router";
import { Alert, AlertTitle } from "../../components/Alert";
import { MaterialIcons } from "@expo/vector-icons";
import { getFeesAccess } from "../../services/SchoolFeesService";
import { useQuery } from "../../hooks/useQuery";

export default function CourseEnrollment() {
  const router = useRouter();
  const paymentModalRef = React.useRef<BottomSheet>(null);
  const handleOpenPaymentModal = () => {
    if (paymentModalRef.current) paymentModalRef.current.collapse();
  };
  const handleOnSuccessfulPayment = () => {
    router.push("/courses");
  };

  const feesAccess = useQuery(
    async () => {
      const res = await getFeesAccess();
      return res.data.data;
    },
    {
      onSuccessFunction: (data) => {
        console.log({ data });
      },

      onErrorFunction: (error) => {
        console.log({ error: error });
      },
      // isDisabled: !token,
    }
  );

  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [selectedCourses, setSelectedCourses] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [level, setLevel] = React.useState<string>("100 level"); // null);
  const { user } = useContext(AuthContext);

  // const level = useQuery(

  return (
    <ScrollView className="bg-white">
      <View className="flex-col h-[80vh] justify-between flex-1 p-6">
        <View className="">
          <View className="my-3">
            <Text className="">
              Choose the session courses you want to register
            </Text>
          </View>
          {/* <View className="flex-col justify-between gap-2 my-4">
            <View className="">
              <Picker
                onChange={(value) => setLevel(value)}
                value={level}
                placeholder="Choose Level"
                items={[
                  { label: "100 level", value: "100l" },
                  // { label: "200 level", value: "200l" },
                  // { label: "300 level", value: "300l" },
                ]}
              />
            </View>
          </View> */}
          <View className="my-3 mt-8 ">
            <Input
              value={"2023"}
              classNames="mb-2"
              variant="disabled"
              disabled
            />
            <Input
              value={"100"}
              classNames="mb-2"
              variant="disabled"
              disabled
            />
            <Input
              value={user.matno}
              classNames="mb-2"
              variant="disabled"
              disabled
            />
            <Input
              value={"Electrical/Electronics"}
              variant="disabled"
              disabled
            />
          </View>
          {feesAccess.data === 0 && (
            <View className="">
              <Alert
                icon={<MaterialIcons name="warning" size={24} />}
                variant="destructive"
              >
                <AlertTitle
                  className="text-red-500"
                  content="You cannot register your courses because you have not paid your current fees"
                />
              </Alert>
              <Button
                classNames="items-start py-4"
                href={"/school-fees"}
                textClassNames="text-primary underline text-left"
                variant="link"
              >
                Pay School Fees
              </Button>
            </View>
          )}
        </View>

        <View className="justify-end flex-1 justify-self-end ">
          <Button
            classNames="w-full"
            // onClick={handleOpenPaymentModal}
            href={`/courses?level=${level}`}
            variant="outline"
            loading={feesAccess.isLoading}
            disabled={!level || feesAccess.isLoading || feesAccess.data === 0}
          >
            Register {level}
          </Button>
        </View>

        <PaymentModal
          firstRef={paymentModalRef}
          onSuccess={() => { }}
          amount={100}
        />
      </View>
    </ScrollView>
  );
}
