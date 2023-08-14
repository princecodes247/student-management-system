import { apiUrl } from "../constants";
import axios from "axios";
import HttpClient from "../lib/http";
import PersistentKeyStore from "../lib/PersistentKeyStore";

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

function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result.split(",")[1];
      resolve(base64Data);
    };

    reader.onerror = () => {
      reject(new Error("Error reading blob data"));
    };

    reader.readAsDataURL(blob);
  });
}

// Add a response interceptor
api.interceptors.response.use(
  async (response) => {
    const contentType = response.headers["content-type"];

    if (contentType === "application/json") {
      // No need to modify JSON responses
      return response;
    } else if (
      contentType === "application/octet-stream" ||
      contentType === "application/pdf"
    ) {
      try {
        const base64Data = await convertBlobToBase64(response.data);
        const jsonData = { data: base64Data };

        return {
          ...response,
          data: jsonData,
        };
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      // For other content types, return response as is
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
const authHeaders = async (extraConfig?: {
  [key: string]: string | undefined;
}) => {
  console.log("authHeaders", await PersistentKeyStore.getValueFor("token"));
  return {
    ...{
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        (await PersistentKeyStore.getValueFor("token")) ?? ""
      }`,
    },
    ...extraConfig,
  };
};
export { apiUrl as baseURL, authHeaders, uninterceptedApi };
export default api;
