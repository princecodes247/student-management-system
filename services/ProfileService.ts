import api, { authHeaders } from "./config";

const servicePrefix = "/profile";

export const uploadDocs = () => {
  const instance = api.post(servicePrefix + "/", {
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      // headers: authHeaders()
    },
  });
  return instance;
};
