import api, { authHeaders } from "./config";

const servicePrefix = "/profile";

export const uploadDocs = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onMutate?: (data: any) => void;
}) => {
  const instance = api.post({
    path: servicePrefix + "/",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      // headers: authHeaders()
    },
    onSuccess,
    onError,
    onMutate,
  });
  return instance;
};
