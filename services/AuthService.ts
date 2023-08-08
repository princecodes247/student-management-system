import { AxiosResponse } from "axios";
import { LoginRequest, LoginResponse } from "../interfaces/services";
import api, { authHeaders } from "./config";

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

export const updateProfile = () => {
  const instance = api.post(servicePrefix + "/update-profile", {
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      // headers: authHeaders()
    },
  });
  return instance;
};

const signOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  return true;
};

export { signIn, signOut };
