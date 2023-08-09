import React, { useContext, useEffect } from "react";
import { cn } from "../../lib/utils";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input } from "../../components/Input";
import { Picker } from "../../components/Picker";
import Button from "../../components/Button";
import { PaymentModal } from "../../components/modals/payment";
import { AuthContext } from "../../layouts/AuthProvider";
import { getCourses, registerCourses } from "../../services/CourseService";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ICourse } from "../../interfaces";
import { useRouter } from "expo-router";

export default function CourseEnrollment() {
  const router = useRouter();
  const paymentModalRef = React.useRef<BottomSheet>(null);
  const handleOpenPaymentModal = () => {
    if (paymentModalRef.current) paymentModalRef.current.collapse();
  };
  const handleOnSuccessfulPayment = () => {
    router.push("/courses");
  };
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [selectedCourses, setSelectedCourses] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [level, setLevel] = React.useState<string>(null);
  const { user } = useContext(AuthContext);

  return (
    <ScrollView className="h-full bg-white">
      <View className="flex-col justify-between flex-1 h-[80vh] p-6">
        <View className="flex-1">
          <View className="my-3">
            <Text className="">
              Choose the session courses you want to register
            </Text>
          </View>
          <View className="flex-col justify-between gap-2 my-4">
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
          </View>
          <View className="my-3 mt-8 ">
            <Input
              value={user.matno}
              classNames="mb-2"
              variant="disabled"
              disabled
            />
            <Input
              value={"Electrical/Electronics" ?? ""}
              variant="disabled"
              disabled
            />
          </View>
        </View>

        <View className="flex-[3] h-full justify-end">
          <Button
            classNames="w-full"
            // onClick={handleOpenPaymentModal}
            href={`/courses?level=${level}`}
            variant="outline"
            loading={isLoading}
            disabled={!level}
          >
            Register {level}
          </Button>
        </View>

        <PaymentModal
          firstRef={paymentModalRef}
          onSuccess={() => {}}
          amount={100}
        />
      </View>
    </ScrollView>
  );
}
