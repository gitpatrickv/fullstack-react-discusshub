import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const { colorMode } = useColorMode();
  return (
    <Box position="relative">
      <form>
        <InputGroup>
          <Input
            borderRadius="full"
            placeholder="Search..."
            variant="filled"
            border="none"
            bg={colorMode === "dark" ? "gray.700" : "white"}
            _hover={{ border: "none" }}
            _focus={{
              boxShadow: "none",
              border: "none",
              bg: colorMode === "dark" ? "gray.700" : "white",
            }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={
                <BsSearch color={colorMode === "dark" ? "white" : "black"} />
              }
              type="submit"
              bg={colorMode === "dark" ? "gray.700" : "white"}
              borderRadius="full"
              _hover={{ bg: colorMode === "dark" ? "gray.600" : "gray.200" }}
              _active={{ bg: colorMode === "dark" ? "gray.600" : "gray.200" }}
              borderWidth="3px"
              borderColor={colorMode === "dark" ? "gray.800" : "gray.100"}
              color="white"
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default Search;
