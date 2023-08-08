import { ICourse, IFee, Semester } from "../interfaces";
import api, { authHeaders, uninterceptedApi } from "./config";

const servicePrefix = "/";

export const getFees = async (matNo: string, level: number = 100) => {
  const instance = await api.get<{
    fees: IFee[];
    status: number;
  }>(servicePrefix + `student/payment/fees/${matNo}?level=${level}`, {
    headers: await authHeaders(),
  });
  return instance;
};
