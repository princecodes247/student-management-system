import api from "./config";

const servicePrefix = "/auth";

const signIn = () => {
  const instance = api.post(servicePrefix + "/login");
  return instance;
};

const signOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  return true;
};

export { signIn, signOut };
