import { AvailableIcons } from "../components/Icon";

export const apiUrl = "https://armsapi1-a5ddfd0e090d.herokuapp.com/api";

export const webUrl = "https://student-management-system-web.vercel.app";
export const InAppRoutes = {
  login: "/onboarding/login",
};
export const actionsList: {
  title: string;
  link: string;
  icon: AvailableIcons;
  description: string;
}[] = [
  {
    title: "Pay Fees",
    icon: "schoolFeesAction",
    description: "Pay your school fees and levies.",
    link: "/school-fees",
  },
  {
    title: "Course Enrollment",
    icon: "courseEnrollmentAction",
    description: "Register your courses for the semester",
    link: "/course-enrollment",
  },
  {
    title: "Check Result",
    icon: "academicResultsAction",
    description: "Check results and save them",
    link: "/results",
  },

  {
    title: "Lectures and Timetables",
    link: "/timetable",
    icon: "lecturesTimetablesAction",
    description: "Stay updated with your lectures",
  },
];
