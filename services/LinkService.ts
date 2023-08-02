import { AxiosResponse } from "axios";
import { ResponseBody } from "../interfaces/services";
import api, { authHeaders } from "./config";
import { ILinkData } from "../interfaces";

const servicePrefix = "/links/";

export const getSingleLink = (id: string) => {
  return api.get<ILinkData>(servicePrefix + id + "/get", {
    headers: authHeaders(),
  });
};

export const createLink = (data: {
  destinationURL: string;
  affiliateLink: string;
}) => {
  return api.post<ResponseBody<{}>>(servicePrefix + "shorten", data, {
    headers: authHeaders(),
  });
};

export const deleteLink = ({ id }: { id: string }) => {
  return api.delete(servicePrefix + id + "/delete", {
    headers: authHeaders(),
  });
};

export const getLinks = ({
  name,
  page,
  pageSize,
}: Partial<{
  name: string;
  page: number;
  pageSize: number;
}>) => {
  return api.get<ILinkData[]>(
    `${servicePrefix}?name=${name}&page=${page}&pageSize=${pageSize}`,
    {
      headers: authHeaders(),
    }
  );
};

export const updateLink = ({
  linkData,
  id,
}: {
  id: string;
  linkData: Partial<ILinkData>;
}) => {
  return api.patch(servicePrefix + id, linkData, {
    headers: authHeaders(),
  });
};

export const subscribeToNewsletter = (email: string) => {
  return api.post(servicePrefix + "649d9435224e46dbf5ea2d4f", {
    email,
  });
};
