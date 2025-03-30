import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <IconButton
      aria-label={
        colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
      }
      icon={
        colorMode === "dark" ? (
          <MdOutlineLightMode size="30px" />
        ) : (
          <MdOutlineDarkMode size="30px" />
        )
      }
      onClick={toggleColorMode}
      border="none"
      background="none"
      _hover={{ background: "none" }}
      _active={{ background: "none" }}
      mr="5px"
    />
  );
};

export default ColorModeSwitch;
