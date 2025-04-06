import { useInfiniteQuery } from "@tanstack/react-query";
import { GetAllPost } from "../entities/Post";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

export interface PaginateProps {
  pageSize: number;
  communityName?: string;
  sortDirection?: string;
}

const useGetAllPosts = ({
  pageSize,
  communityName,
  sortDirection,
}: PaginateProps) => {
  return useInfiniteQuery<GetAllPost, Error>({
    queryKey: ["post", communityName, sortDirection, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<GetAllPost>(`/post`, {
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
          communityName: communityName,
          sortDirection: sortDirection,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    initialPageParam: 0,
  });
};

export default useGetAllPosts;
