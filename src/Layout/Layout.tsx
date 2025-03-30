import { Box, Card, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useUserStore } from "../store/user-store";
import Navbar from "./components/Navbar";
import useGetCurrentUserInfo from "./hooks/useGetCurrentUserInfo";

const Layout = () => {
  const { data: getUserInfo, isLoading } = useGetCurrentUserInfo();
  const { setName, setPicture, setGender, setEmail } = useUserStore();
  useEffect(() => {
    if (getUserInfo) {
      setName(getUserInfo.name);
      setPicture(getUserInfo.photoUrl || null);
      setGender(getUserInfo.gender);
      setEmail(getUserInfo.email);
    }
  }, [getUserInfo]);
  return (
    <Box minWidth="1440px">
      {isLoading ? <Skeleton height="50px" width="100%" /> : <Navbar />}
      <Grid
        templateColumns="0.3fr 0.4fr 1fr 0.4fr 0.3fr"
        templateAreas={`"sidebar empty content recent asideRight"`}
        gap={4}
        flex="1"
      >
        <GridItem area="sidebar">
          <Card>SIDEBAR</Card>
        </GridItem>
        <GridItem area="content">
          <Outlet />
          <ScrollRestoration />
        </GridItem>
        <GridItem area="recent">
          <Card>RECENT</Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
