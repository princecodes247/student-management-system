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
import { ICourse, ICourseMap, Semester } from "../../interfaces";
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

  const [coursesMap, updateCoursesMap] = React.useReducer(
    (
      state: ICourseMap,
      newValue: {
        type: "ADD" | "REMOVE";
        value: string;
      }
    ) => {
      if (newValue.type === "ADD") {
        return {
          ...state,
          [newValue.value]: {
            selected: true,
          },
        };
      } else {
        const { [newValue.value]: _, ...rest } = state;
        return rest;
      }
    },
    {}
  );

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
      console.log({ data23: data });
      alert("Courses registered successfully");
      router.push("/home");
    },
    onMutateFunction: (data) => {
      console.log({ data12: data });
    },
    onErrorFunction: (error) => {
      console.log({ error12: error });
    },
  });
  return (
    <ScrollView className="bg-white">
      <View className="flex-1 h-full p-6 ">
        <View className="flex-1 pt-8 pb-8">
          {courses.isLoading ? (
            <Text>Loading...</Text>
          ) : !courses.isLoading && courses?.data?.length > 0 ? (
            <View>
              <Text className="mb-4 text-base">First Semester</Text>

              {React.Children.toArray(
                courses.data.map((item) => {
                  return (
                    item.semester.includes(Semester.first) && (
                      <CourseCard
                        updateCourse={(selected: boolean) => {
                          updateCoursesMap({
                            type: selected ? "ADD" : "REMOVE",
                            value: item.code,
                          });
                        }}
                        course={item}
                      />
                    )
                  );
                })
              )}
              <Text className="mb-4 text-base">Second Semester</Text>
              {React.Children.toArray(
                courses.data.map(
                  (item) =>
                    item.semester.includes(Semester.second) && (
                      <CourseCard
                        updateCourse={(selected: boolean) => {
                          updateCoursesMap({
                            type: selected ? "ADD" : "REMOVE",
                            value: item.code,
                          });
                        }}
                        course={item}
                      />
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
            loading={registerCoursesMutation.isLoading}
            onClick={() =>
              registerCoursesMutation.mutate({
                level: "100",
                session: "2023",
                courses: Object.keys(coursesMap),
                matno: user?.matno,
              })
            }
          >
            Register Courses
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
