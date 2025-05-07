import { Box, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavTop from "./NavTop";
import Search from "./Search";

const Navbar = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      width="100%"
      borderRadius="none"
      padding="10px"
      borderBottom="1px solid"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      position="sticky"
      top="0"
      zIndex={10}
      background={colorMode === "dark" ? "gray.800" : "gray.100"}
      height="60px"
    >
      <Grid
        templateColumns="0.4fr 0.4fr 0.4fr"
        templateAreas={`"asideLeft  mid  asideRight"`}
        alignItems="center"
      >
        <GridItem area="asideLeft">
          <Link to="/">
            <AiOutlineHome size="30px" cursor="pointer" />
          </Link>
        </GridItem>
        <GridItem area="mid">
          <Search />
        </GridItem>
        <GridItem area="asideRight">
          <NavTop />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Navbar;
