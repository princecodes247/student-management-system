import { ICourse, IFee, Semester } from "../interfaces";
import { IReceiptResponse } from "../interfaces/services";
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
  const instance = await api.get<IReceiptResponse>(
    servicePrefix + `payment/details/${ref}`,
    {
      headers: await authHeaders(),
    }
  );
  return instance;
};

export const getFeesReport = async ({ ref }: { ref: string }) => {
  console.log({ ref });
  const instance = await api.get(
    servicePrefix + `invoice/${ref}`,

    {
      headers: {
        ...(await authHeaders()),
        // Content Type for pdf blob
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }
  );

  return instance;
};

export const getFeesAccess = async () => {
  const instance = await api.get<{
    status: number;
    data: 0 | 1;
  }>(servicePrefix + `student/auth/fee/access`, {
    headers: await authHeaders(),
  });
  return instance;
};
