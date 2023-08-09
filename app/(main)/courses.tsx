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
import { useQuery } from "../../hooks/useQuery";
import { CourseCard } from "../../components/CourseCard";
import { useMutate } from "../../hooks/useMutate";

export default function Courses() {
  const router = useRouter();

  // const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [level, setLevel] = React.useState<string>("100");

  const { user } = useContext(AuthContext);
  const courses = useQuery(
    async () => {
      console.log("why here");
      const res = await getCourses(100);
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

  const registerCoursesMutation = useMutate(registerCourses, {
    onSuccessFunction: (data) => {
      console.log({ data });
    },
  });
  return (
    <ScrollView className="bg-white">
      <View className="flex-1 h-full p-6 ">
        <View className="flex-1">
          <View className="my-3">
            <Text className="text-base text-gray-500">
              Your courses for the {level} level semester
            </Text>
          </View>
        </View>

        <View className="flex-1 pt-8 pb-8">
          <Text className="mt-8 mb-4 text-xl font-semibold">Courses</Text>
          {!courses.isLoading && courses?.data?.length > 0 ? (
            <View>
              <Text>First Semester</Text>

              {React.Children.toArray(
                courses.data.map((item) => {
                  return (
                    item.semester.includes(Semester.first) && (
                      <CourseCard course={item} />
                    )
                  );
                })
              )}
              <Text>Second Semester</Text>
              {React.Children.toArray(
                courses.data.map(
                  (item) =>
                    item.semester.includes(Semester.second) && (
                      <CourseCard course={item} />
                    )
                )
              )}
            </View>
          ) : (
            <View className="py-6">
              <Text className="text-center text-gray-500">No courses yet</Text>
            </View>
          )}
        </View>
        <View>
          <Button
            onClick={() =>
              registerCoursesMutation.mutate({
                level: "100",
                courses: ["MTH 101", "MTH 102"],
                matno: user?.matno,
              })
            }
          >
            <Text className="text-base text-white">Register Courses</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
