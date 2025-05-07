import { Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";

const PostButtons = () => {
  const { colorMode } = useColorMode();

  const boxStyles = {
    alignItems: "center",
    padding: "10px",
    borderRadius: "full",
    cursor: "pointer",
  };

  return (
    <Flex mt="10px" alignItems="center" gap={3}>
      <Center
        alignItems="center"
        bg={colorMode === "dark" ? "#303030" : "gray.200"}
        borderRadius="full"
        overflow="hidden"
        width="98px"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Flex
          {...boxStyles}
          _hover={{
            bg: colorMode === "dark" ? "#404040" : "gray.300",
            color: "#165BB7",
          }}
        >
          <BiUpvote size="20px" />
        </Flex>
        <Text px="5px">1</Text>
        <Flex
          {...boxStyles}
          _hover={{
            bg: colorMode === "dark" ? "#404040" : "gray.300",
            color: "#E64A19",
          }}
        >
          <BiDownvote size="20px" />
        </Flex>
      </Center>

      <Center
        bg={colorMode === "dark" ? "#303030" : "gray.200"}
        width="70px"
        alignItems="center"
        borderRadius="full"
        _hover={{
          bg: colorMode === "dark" ? "#404040" : "gray.300",
        }}
        cursor="pointer"
      >
        <Flex py="10px">
          <IoChatbubbleOutline size="20px" />
        </Flex>
        <Text ml="5px">5</Text>
      </Center>
    </Flex>
  );
};

export default PostButtons;
