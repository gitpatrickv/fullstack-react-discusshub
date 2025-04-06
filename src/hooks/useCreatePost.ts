import { useDisclosure } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../services/api-client";

interface CreatePostProps {
  title: string;
  content: string;
  community?: string;
}

const apiClient = axiosInstance;

const useCreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorFields = ["title", "content"];
  const { handleSubmit, setError, control } = useForm<CreatePostProps>();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: CreatePostProps) =>
      apiClient.post("/post", data).then((res) => res.data),

    onSuccess: () => {
      setLoading(false);
      onClose();
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
