import React, { useContext, useEffect } from "react";
import { cn } from "../../lib/utils";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input } from "../../components/Input";
import { Picker } from "../../components/Picker";
import Button from "../../components/Button";
import { PaymentModal } from "../../components/modals/payment";
import { AuthContext } from "../../layouts/AuthProvider";
import {
  getCourses,
  getEnrolledCourses,
  registerCourses,
} from "../../services/CourseService";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ICourse, Semester } from "../../interfaces";
import { useRouter } from "expo-router";

export default function Courses() {
  const router = useRouter();

  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [level, setLevel] = React.useState<string>("100");
  const [semester, setSemester] = React.useState<Semester>(Semester.first);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (semester && level) {
      setIsLoading(true);
      getEnrolledCourses({
        level,
        semester,
        userId: user.id,
      }).then((data) => {
        console.log({ data: data.data });
        setCourses(data.data);
        setIsLoading(false);
      });
    }
  }, [semester]);

  return (
    <ScrollView className="bg-white">
      <View className="flex-1 h-full p-6 ">
        <View className="flex-1">
          <View className="my-3">
            <Text className="text-base text-gray-500">
              Your courses for the {level} level - {semester} semester
            </Text>
          </View>
        </View>

        <View className="flex-1 pt-8 pb-8">
          <Text className="mt-8 mb-4 text-xl font-semibold">Courses</Text>
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
              <Text className="text-center text-gray-500">No courses yet</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
