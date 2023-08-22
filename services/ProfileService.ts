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
// {{HOST}}/lgas/7
// {{HOST}}/states
// {{HOST}}/titles

export const getStates = async () => {
  const instance = await api.get<{
    status: number;
    data: { id: number; state: string }[];
  }>(`/states`, {
    headers: await authHeaders(),
  });
  return instance;
};

export const getLGAs = async (stateNo: string) => {
  const instance = await api.get<{
    status: number;
    lga: { lga: string }[];
  }>(`/lgas/${stateNo}`, {
    headers: await authHeaders(),
  });
  return instance;
};

export const getTitles = async () => {
  const instance = await api.get<{
    status: number;
    titles: { title: string }[];
  }>(`/titles`, {
    headers: await authHeaders(),
  });
  return instance;
};
