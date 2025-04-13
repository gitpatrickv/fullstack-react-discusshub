import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import useGetAllCommunities from "../../Layout/hooks/useGetAllCommunities";
import useCreatePost from "../../hooks/useCreatePost";
import { useAuthQueryStore } from "../../store/auth-store";
import MainButton from "../Button/MainButton";
import TextInput from "../Input/TextInput";
import TextareaInput from "../Input/TextareaInput";

const CreatePostModal = () => {
  const [communityName, setCommunityName] = useState("public");
  const { handleSubmit, loading, onSubmit, control, onOpen, isOpen, onClose } =
    useCreatePost(communityName);
  const initialRef = useRef(null);
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: communities } = useGetAllCommunities();

  const handleCommunityNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCommunityName(event.target.value);
  };

  if (!jwtToken) {
    return null;
  }

  return (
    <>
      <MainButton mr="10px" borderRadius="full" onClick={onOpen}>
        <IoAddOutline size="25px" />
        <Text ml="5px">Create Post</Text>
      </MainButton>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        isCentered
      >
        <ModalOverlay />

        <ModalContent borderRadius="none" py={2}>
          <ModalCloseButton />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
            }}
          >
            <ModalBody>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Create Post
              </Text>

              <Select
                borderRadius="none"
                width="200px"
                mb="10px"
                onChange={handleCommunityNameChange}
                value={communityName}
              >
                {communities?.map((community) => (
                  <option
                    key={community.communityId}
                    value={community.communityName}
                  >
                    {community.communityName}
                  </option>
                ))}
              </Select>
              <TextInput
                control={control}
                name="title"
                loading={loading}
                placeholder="Title"
              />
              <TextareaInput
                control={control}
                name="content"
                loading={loading}
                placeholder="Content"
                mt="10px"
              />
              <Flex justifyContent="end" mt="15px">
                <MainButton type="submit" borderRadius="full" width="120px">
                  Post
                </MainButton>
              </Flex>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
