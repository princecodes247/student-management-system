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
