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

export const payFees = async (payload: {
  level: string;
  totalAmount: string;
  feeIds: number[];
  payurl: string;
}) => {
  console.log({ payload });
  const instance = await api.post<{
    url: string;
    status: number;
  }>(
    servicePrefix + `student/app/pay`,
    {
      ...payload,
      feeIds: payload.feeIds.join(" "),
    },
    {
      headers: await authHeaders(),
    }
  );
  return instance;
};

export const getFeesDetails = async (ref: string) => {
  const instance = await api.get<{
    status: number;
    data: {
      fullName: string;
      matno: string;
      academicSession: number;
      level: number;
      fees: {
        id: number;
        fee: string;
        amount: string;
      }[];
      phoneNumber: string;
      transaction_id: number;
      transaction_ref: string;
      transactionTime: string;
      paymentChannel: "card";
      currency: "NGN";
      cardNumber: string;
      bank: string;
    };
  }>(servicePrefix + `payment/details/${ref}`, {
    headers: await authHeaders(),
  });
  return instance;
};
