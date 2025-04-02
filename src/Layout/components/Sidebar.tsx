import { Box, Text, useColorMode } from "@chakra-ui/react";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      borderRadius="none"
      height="100%"
      padding={2}
      borderRight="1px solid"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      width="250px"
    >
      <Text>SIDEBAR</Text>
      <Text>SIDEBAR</Text>
    </Box>
  );
};

export default Sidebar;
