import {
  Avatar,
  Box,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SlLogout } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../assets/profpic.jpeg";
import ColorModeSwitch from "../../components/ColorModeSwitch";
import CreatePostModal from "../../components/modal/CreatePostModal";
import { useAuthQueryStore } from "../../store/auth-store";
import { useCommunityStore } from "../../store/community-store";
import { useUserStore } from "../../store/user-store";
import Login from "./Login";
import Register from "./Register";
const NavTop = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { picture, resetUser } = useUserStore();
  const queryClient = useQueryClient();
  const { authStore, logout, isOpen, onOpen, onClose } = useAuthQueryStore();
  const { clearCommunities } = useCommunityStore();
  const jwtToken = authStore.jwtToken;
  const handleLoginClick = (value: boolean) => {
    setIsLogin(value);
    onOpen();
  };

  const handleLogoutClick = () => {
    navigate("/");
    setTimeout(() => {
      resetUser();
      queryClient.setQueryData(["user"], null);
      logout();
      clearCommunities();
    }, 200);
  };

  const textStyles = {
    cursor: "pointer",
    userSelect: "none" as "none",
    _hover: {
      textDecoration: "underline",
    },
    mr: "10px",
  };

  return (
    <>
      <Flex justifyContent="end" alignItems="center">
        <CreatePostModal />
        {jwtToken ? (
          <Menu>
            <MenuButton aria-label="menu" userSelect="none" mr="5px">
              <Avatar src={picture || pic} size="sm" />
            </MenuButton>
            <MenuList borderRadius="none" position="relative" py={0}>
              <Link to="/profile">
                <MenuItem paddingBottom={3} paddingTop={3}>
                  <Avatar src={picture || pic} size="xs" />
                  <Text ml="16px">Profile</Text>
                </MenuItem>
              </Link>
              <MenuItem
                onClick={handleLogoutClick}
                paddingBottom={3}
                paddingTop={3}
              >
                <SlLogout size="20px" />
                <Text ml="20px">Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Text onClick={() => handleLoginClick(true)} {...textStyles}>
              LOGIN
            </Text>
            <Text onClick={() => handleLoginClick(false)} {...textStyles}>
              SIGNUP
            </Text>
          </>
        )}
        <ColorModeSwitch />
      </Flex>

      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="none">
            <ModalCloseButton />
            <ModalBody mt="10px">
              <Box>
                <Flex justifyContent="space-evenly" alignItems="center">
                  <Text
                    fontSize="x-large"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    cursor="pointer"
                    onClick={() => setIsLogin(true)}
                    color={isLogin ? "white.500" : "gray.500"}
                    userSelect="none"
                  >
                    Login
                  </Text>
                  <Divider
                    orientation="vertical"
                    height="30px"
                    borderColor="gray.300"
                    ml="10px"
                  />
                  <Text
                    fontSize="x-large"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    cursor="pointer"
                    onClick={() => setIsLogin(false)}
                    color={isLogin ? "gray.500" : "white.500"}
                    userSelect="none"
                  >
                    Register
                  </Text>
                </Flex>
                <Divider mb="15px" mt="15px" />
                {isLogin ? <Login /> : <Register />}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default NavTop;
