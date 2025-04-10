import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/api-client";
import { Post } from "../../../entities/Post";

const apiClient = axiosInstance;

const useGetOnePost = (postId: string) => {
  return useQuery({
    queryKey: ["singlePost", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<Post>(`/post/${postId}`);
      return data;
    },
    enabled: !!postId,
  });
};

export default useGetOnePost;
