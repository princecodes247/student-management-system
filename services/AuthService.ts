import { AxiosResponse } from "axios";
import { LoginRequest, LoginResponse } from "../interfaces/services";
import api, { authHeaders } from "./config";
import { IProfile } from "../interfaces";

const servicePrefix = "/";

const signIn = (payload: LoginRequest) => {
  const instance = api.post<LoginRequest, AxiosResponse<LoginResponse>>(
    servicePrefix + "student/login",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      // headers: authHeaders()
    }
  );
  return instance;
};

export const updateProfile = async (payload: IProfile) => {
  const instance = api.post<IProfile>(
    servicePrefix + "student/update-student",
    payload,
    {
      // headers: {
      //   "Content-Type": "application/json",
      // },
      headers: await authHeaders(),
    }
  );
  return instance;
};

const signOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  return true;
};

export { signIn, signOut };
