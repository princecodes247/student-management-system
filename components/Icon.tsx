import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import SchoolFeesActionIcon from "../assets/school-fees.svg";
import AcademicResultsActionIcon from "../assets/academic-results.svg";
import CourseEnrollmentActionIcon from "../assets/course-enrollment.svg";
import LecturesTimetablesActionIcon from "../assets/lectures-timetables.svg";
import HomeNavIcon from "../assets/home.svg";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type IconProps = {
  classNames?: string;
  name: AvailableIcons;
};

export type AvailableIcons = keyof typeof IconsList;
const IconsList = {
  schoolFeesAction: SchoolFeesActionIcon,
  academicResultsAction: AcademicResultsActionIcon,
  courseEnrollmentAction: CourseEnrollmentActionIcon,
  lecturesTimetablesAction: LecturesTimetablesActionIcon,
  homeNavIcon: HomeNavIcon,
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
