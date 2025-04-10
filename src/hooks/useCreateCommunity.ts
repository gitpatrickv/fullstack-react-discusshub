import { useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../services/api-client";

interface CreateCommunityProps {
  communityName: string;
  description: string;
}

const apiClient = axiosInstance;

const useCreateCommunity = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorFields = ["communityName", "description"];
  const queryClient = useQueryClient();
  const { handleSubmit, setError, control } = useForm<CreateCommunityProps>();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: CreateCommunityProps) =>
      apiClient.post("/community", data).then((res) => res.data),

    onSuccess: (response) => {
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

  const onSubmit: SubmitHandler<CreateCommunityProps> = (data) => {
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

export default useCreateCommunity;
