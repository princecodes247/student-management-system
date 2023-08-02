import api from "./config";

const servicePrefix = "/auth";

const signIn = (data: any) => {
  return api.post(servicePrefix + "/login", data);
};

const signOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  return true;
};

export { signIn, signOut };
