import { Link } from "expo-router";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { ICourse } from "../interfaces";
import clsx from "clsx";

const CourseCard = ({ course }: { course: ICourse }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <Pressable
      onPress={() => setIsSelected(!isSelected)}
      className={clsx(
        "p-8 pl-3 py-6 mb-2 border items-center flex-row",
        isSelected
          ? "bg-blue-100 border-blue-200"
          : "border-gray-200 bg-gray-100"
      )}
      key={course.code}
    >
      <Checkbox
        className="mr-4"
        value={isSelected}
        onValueChange={setIsSelected}
      />
      <Text className="flex-1 ">
        {course.title}
        {course.status === "Compulsory" ? (
          <Text className="text-red-500">*</Text>
        ) : (
          ""
        )}
      </Text>
      <Text className="flex-1 text-center">{course.units} Units</Text>
      <Text className="flex-1 text-center">{course.code}</Text>
    </Pressable>
  );
};

export { CourseCard };
