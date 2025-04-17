import {
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
import MainButton from "../../components/Button/MainButton";
import TextareaInput from "../../components/Input/TextareaInput";
import TextInput from "../../components/Input/TextInput";
import useCreateCommunity from "../../hooks/useCreateCommunity";
import { useAuthQueryStore } from "../../store/auth-store";

const CreateCommunityModal = () => {
  const initialRef = useRef(null);
  const { handleSubmit, loading, onSubmit, control, onOpen, isOpen, onClose } =
    useCreateCommunity();
  const { authStore, onOpen: onOpenLoginModal } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return (
    <>
      <MainButton
        borderRadius="full"
        onClick={jwtToken ? onOpen : onOpenLoginModal}
        mt="10px"
        mb="10px"
      >
        <IoAddOutline size="25px" />
        <Text ml="5px">Create a Community</Text>
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
                Create Community
              </Text>

              <TextInput
                control={control}
                name="communityName"
                loading={loading}
                placeholder="Community Name"
              />
              <TextareaInput
                control={control}
                name="description"
                loading={loading}
                placeholder="Description"
                mt="10px"
              />
              <Flex justifyContent="end" mt="15px">
                <MainButton type="submit" borderRadius="full">
                  Create Community
                </MainButton>
              </Flex>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
