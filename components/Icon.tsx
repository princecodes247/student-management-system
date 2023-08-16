import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import SchoolFeesIcon from "../assets/school-fees.png";
import AcademicResultsIcon from "../assets/academic-results.png";
import CourseEnrollmentIcon from "../assets/course-enrollment.png";
import LecturesTimetablesIcon from "../assets/lectures-timetables.png";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type IconProps = {
  classNames?: string;
  name: AvailableIcons;
};

export type AvailableIcons = keyof typeof IconsList;
const IconsList = {
  schoolFees: SchoolFeesIcon,
  academicResults: AcademicResultsIcon,
  courseEnrollment: CourseEnrollmentIcon,
  lecturesTimetables: LecturesTimetablesIcon,
};

export default function Icon({ classNames, name }: IconProps) {
  return (
    <Image
      className={classNames}
      source={IconsList[name]}
      //   placeholder={blurhash}
      contentFit="cover"
      transition={1000}
    />
  );
}
