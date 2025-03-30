import { Card, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavTop from "./NavTop";
import Search from "./Search";

const Navbar = () => {
  const { colorMode } = useColorMode();

  return (
    <Card
      width="100%"
      bg={colorMode === "dark" ? "gray.700" : "#1877F2"}
      borderRadius="none"
      padding={2}
    >
      <Grid
        templateColumns="0.4fr 0.4fr 0.4fr"
        templateAreas={`"asideLeft  mid  asideRight"`}
        alignItems="center"
      >
        <GridItem area="asideRight">
          <NavTop />
        </GridItem>
        <GridItem area="mid">
          <Search />
        </GridItem>
        <GridItem area="asideLeft">
          <Link to="/">
            <AiOutlineHome size="30px" color="white" cursor="pointer" />
          </Link>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Navbar;
