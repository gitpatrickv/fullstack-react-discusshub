import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Community } from "../entities/Post";
import { axiosInstance } from "../services/api-client";
const apiClient = axiosInstance;

const useJoinCommunity = (name: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await apiClient.put(`/community/${name}`).then((res) => res.data);
    },
    onSuccess: (response) => {
      queryClient.setQueryData<Community[]>(["communities"], (old = []) => [
        response,
        ...old,
      ]);
    },
  });
};

export default useJoinCommunity;
