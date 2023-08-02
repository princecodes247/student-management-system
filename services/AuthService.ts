import api, { authHeaders } from "./config";

const servicePrefix = "/auth";

const signIn = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onMutate?: (data: any) => void;
}) => {
  const instance = api.post({
    path: servicePrefix + "/login",
    config: {
      // headers: authHeaders()
    },
    onSuccess,
    onError,
    onMutate,
  });
  return instance;
};

const signOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  return true;
};

export { signIn, signOut };
