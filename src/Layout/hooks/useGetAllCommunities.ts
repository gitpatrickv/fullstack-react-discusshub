import { useQuery } from "@tanstack/react-query";
import { Community } from "../../entities/Post";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetAllCommunities = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      const { data } = await apiClient.get<Community[]>(`/community`);
      return data;
    },
    enabled: !!jwtToken,
  });
};

export default useGetAllCommunities;
