import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getLinks } from "../services/LinkService";

const useLinks = ({
  name = "",
  page = 1,
  pageSize = 10,
}: Partial<{
  name: string;
  page: number;
  pageSize: number;
}>) => {
  return useQuery({
    queryKey: ["links", name, page, pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getLinks({
        name,
        page: pageParam,
        pageSize,
      });
      console.log({ result: result.data });
      const links = result.data;
      return links;
    },
    // getNextPageParam: (lastPage, pages) => (lastPage?.meta?.page ?? 1) + 1,
  });
};

export default useLinks;
