import { apiUrl } from "../constants";
import axios from "axios";
import HttpClient from "../lib/http";

const api = axios.create({
  baseURL: apiUrl.toString(),
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});
// const api = new HttpClient(apiUrl.toString());

const uninterceptedApi = axios.create({
  baseURL: apiUrl.toString(),
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a response interceptor
// api.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log("interceptor error", error, error?.response?.data?.message);
//     if (error?.response?.data?.message.toLowerCase().includes("unauthorized")) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       console.log("interceptor errorssq");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

const authHeaders = (extraConfig?: { [key: string]: string | undefined }) => {
  return {
    ...{
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("psg_auth_token") ?? ""}`,
    },
    ...extraConfig,
  };
};
export { apiUrl as baseURL, authHeaders, uninterceptedApi };
export default api;
