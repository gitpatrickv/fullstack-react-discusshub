import { useDisclosure } from "@chakra-ui/react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Post } from "../entities/Post";
import { axiosInstance } from "../services/api-client";

interface CreatePostProps {
  title: string;
  content: string;
  community?: string;
}

const apiClient = axiosInstance;

const updatePostCache = (
  queryClient: QueryClient,
  queryKey: any,
  response: Post
) => {
  queryClient.setQueryData(queryKey, (oldData: any) => {
    if (!oldData) return oldData;

    const updatedFirstPage = {
      ...oldData.pages[0],
      models: [response, ...oldData.pages[0].models].slice(
        0,
        oldData.pages[0].pageResponse.pageSize
      ),
      pageResponse: {
        ...oldData.pages[0].pageResponse,
        totalElements: oldData.pages[0].pageResponse.totalElements + 1,
      },
    };

    return {
      ...oldData,
      pages: [updatedFirstPage, ...oldData.pages.slice(1)],
      pageParams: [...oldData.pageParams],
    };
  });
};

const useCreatePost = (communityName: string) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorFields = ["title", "content"];
  const queryClient = useQueryClient();
  const { handleSubmit, setError, control, reset } = useForm<CreatePostProps>();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: CreatePostProps) =>
      apiClient
        .post("/post", data, {
          params: {
            communityName: communityName,
          },
        })
        .then((res) => res.data),

    onSuccess: (response) => {
      setLoading(false);
      onClose();
      reset();
      const communityQueryKey = ["post", communityName, "DESC", 12];
      const homeQueryKey = ["post", "HOME", "DESC", 12];

      updatePostCache(queryClient, communityQueryKey, response);
      updatePostCache(queryClient, homeQueryKey, response);
    },
    onError: (error: any) => {
      setLoading(false);
      errorFields.forEach((field: any) => {
        if (error.response?.data[field]) {
          setError(field, {
            type: "server",
            message: error.response.data[field],
          });
        }
      });
    },
  });

  const onSubmit: SubmitHandler<CreatePostProps> = (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return {
    handleSubmit,
    loading,
    onSubmit,
    control,
    onOpen,
    isOpen,
    onClose,
  };
};

export default useCreatePost;
