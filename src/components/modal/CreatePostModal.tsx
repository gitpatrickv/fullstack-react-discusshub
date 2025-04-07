import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoAddOutline } from "react-icons/io5";
import useCreatePost from "../../hooks/useCreatePost";
import MainButton from "../Button/MainButton";
import TextInput from "../Input/TextInput";
import TextareaInput from "../Input/TextareaInput";
import { useAuthQueryStore } from "../../store/auth-store";

const CreatePostModal = () => {
  const { handleSubmit, loading, onSubmit, control, onOpen, isOpen, onClose } =
    useCreatePost();
  const initialRef = useRef(null);
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

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
              <Button mb="10px">Select a community</Button>
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
