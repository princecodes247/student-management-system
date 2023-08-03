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
  const [semester, setSemester] = React.useState<string>(null);
  const courseMutation = registerCourses({
    onError: (error) => {
      console.log("I did it", error);
      setIsLoading(false);
    },
    onMutate: (data) => {
      setIsLoading(true);
    },
    onSuccess: async (data) => {
      setIsLoading(false);
      console.log("I did it", data);
    },
  });
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (semester && level) {
      setIsLoading(true);
      getCourses().then((data) => {
        console.log({ data: data.data });
        setCourses(data.data);
        setIsLoading(false);
      });
    }
  }, [semester]);

  return (
    <ScrollView className="bg-white border">
      <View className="flex-1 h-full p-6 ">
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
            {level && (
              <View className="">
                <Picker
                  onChange={(value) => setSemester(value)}
                  value={semester}
                  placeholder="Select Semester"
                  items={[
                    { label: "1st semester", value: "1" },
                    // { label: "2nd semester", value: "2" },
                  ]}
                />
              </View>
            )}
          </View>
          <View className="my-3 mt-8 ">
            <Input
              value={user.matriculation_number}
              classNames="mb-2"
              variant="disabled"
              disabled
            />
            <Input
              value={user?.department?.name ?? ""}
              variant="disabled"
              disabled
            />
          </View>
        </View>
        <View className="flex-1 pt-8 pb-8">
          <Text className="mt-8 mb-4 text-base">Courses to Register</Text>
          {courses.length > 0 ? (
            React.Children.toArray(
              courses.map((item) => (
                <View
                  className="p-8 py-6 mb-2 bg-gray-100 border border-gray-200"
                  key={item._id}
                >
                  <Text>{item.code}</Text>
                </View>
              ))
            )
          ) : (
            <View className="py-6">
              <Text className="text-center text-gray-500">
                No courses available
              </Text>
            </View>
          )}
        </View>

        {courses.length > 0 && (
          <Button
            classNames="w-full"
            onClick={handleOpenPaymentModal}
            variant="outline"
            loading={isLoading}
            disabled={!semester || !level}
          >
            <Text className="font-semibold text-primary">Pay #350</Text>
          </Button>
        )}

        <PaymentModal
          firstRef={paymentModalRef}
          onSuccess={() => {
            courseMutation.mutate({ courses: courses.map((item) => item._id) });
          }}
          amount={100}
        />
      </View>
    </ScrollView>
  );
}
