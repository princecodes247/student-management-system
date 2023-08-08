import { ICourse, Semester } from "../interfaces";
import api, { authHeaders, uninterceptedApi } from "./config";

const servicePrefix = "/";

export const getCourses = async (level: number = 100) => {
  const instance = await api.get<ICourse[]>(
    servicePrefix + `student/get-courses-in/{level}/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      // headers: authHeaders()
    }
  );
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

export const registerCourses = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onMutate?: (data: any) => void;
}) => {
  const instance = api.post("/enrollment" + "/", {
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      // headers: authHeaders()
    },
  });
  return instance;
};
