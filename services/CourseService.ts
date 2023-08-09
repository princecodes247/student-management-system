import { ICourse, Semester } from "../interfaces";
import api, { authHeaders, uninterceptedApi } from "./config";

const servicePrefix = "/";

export const getCourses = async (level: number = 100) => {
  const instance = await api.get<{
    data: ICourse[];
  }>(servicePrefix + `student/get-courses-in/${level}`, {
    headers: await authHeaders(),
  });
  return instance;
};

export const getEnrolledCourses = async ({
  userId,
  level = "100",
  semester = Semester.first,
}: {
  userId: string;
  level?: string;
  semester?: Semester;
}) => {
  const instance = await api.get<ICourse[]>(
    "/enrollment" +
      "?userId=" +
      userId +
      "&level=" +
      level +
      "&semester=" +
      semester,
    {
      headers: {
        "Content-Type": "application/json",
      },
      // headers: authHeaders()
    }
  );
  return instance;
};

// {
//   courses = [
//     "MTH 105",
//     "CHM 101",
//     "PHY 105",
//     "GST 100",
//     "FCE 101",
//     "GST 101",
//     "GST 102",
//     "MTH 105",
//     "CHM 101",
//   ],
//   level = "100",
//   matno = "UG/23/0001",
//   session = "2023",
// }
export const registerCourses = async (payload: {
  courses: string[];
  level?: string;
  matno?: string;
  session?: string;
}) => {
  const instance = api.post<{
    status: number;
    message: string;
    courses: {
      matno: string;
      code: string;
      session: number;
      level: number;
      score: number;
      deleted_at: string | null;
    }[];
  }>("student/course/registration", payload, {
    // headers: {
    //   "Content-Type": "application/json",
    // },
    headers: await authHeaders(),
  });
  return instance;
};
