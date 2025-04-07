import { Avatar, Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import comPic from "../../assets/comunity.png";
import MainButton from "../../components/Button/MainButton";
import { useCommunityStore } from "../../store/community-store";

const Sidebar = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { communities } = useCommunityStore();

  const handleNavigateClick = (name: string) => {
    navigate(`/${name}`);
  };

  return (
    <Box
      borderRadius="none"
      height="100%"
      padding={3}
      borderRight="1px solid"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      width="250px"
    >
      {communities.length >= 1 && (
        <>
          <Text fontSize="xl" fontWeight="semibold">
            Recent
          </Text>
          {[...communities].reverse().map((com) => (
            <Flex
              alignItems="center"
              gap={2}
              mt="5px"
              cursor="pointer"
              _hover={{ bg: colorMode === "dark" ? "gray.700" : "#E0E0E0" }}
              transition="all 0.2s"
              borderRadius="lg"
              padding={2}
              key={com.communityId}
              onClick={() => handleNavigateClick(com.communityName)}
            >
              <Avatar src={com.communityPhotoUrl || comPic} size="sm" />
              <Text fontWeight="semibold">{com.communityName}</Text>
            </Flex>
          ))}
        </>
      )}
      <Text
        fontSize="xl"
        fontWeight="semibold"
        mt={communities.length >= 1 ? "10px" : 0}
      >
        Communities
      </Text>
      <MainButton borderRadius="full">
        <IoAddOutline size="25px" />
        <Text ml="5px">Create a Community</Text>
      </MainButton>
      <Text>My community here</Text>
    </Box>
  );
};

export default Sidebar;
