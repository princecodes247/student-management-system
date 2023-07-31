"use client";
import { useQuery } from "@tanstack/react-query";
import { getSingleLink } from "../services/LinkService";

const useSingleLink = (id: string, handleError = () => {}) => {
  return useQuery({
    queryKey: ["single-link", id],
    queryFn: async () => {
      try {
        const result = await getSingleLink(id);
        console.log({ result: result.data });
        return result.data;
      } catch (error) {
        handleError();
      }
    },
    // placeholderData: [],
    enabled: id.length > 0,
  });
};

export default useSingleLink;
