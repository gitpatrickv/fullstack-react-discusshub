import { Card, Flex, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useUserStore } from "../store/user-store";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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
    <Flex minWidth="1440px" flexDirection="column">
      {isLoading ? <Skeleton height="60px" /> : <Navbar />}
      <Grid
        templateColumns="0.3fr 0.4fr 1fr 0.4fr 0.3fr"
        templateAreas={`"sidebar empty content recent asideRight"`}
        gap={4}
      >
        <GridItem
          area="sidebar"
          position="fixed"
          top="60px"
          height="calc(100vh - 60px)"
          minHeight="100%"
        >
          <Sidebar />
        </GridItem>
        <GridItem area="content" zIndex={1}>
          <Outlet />
          <ScrollRestoration />
        </GridItem>
        <GridItem area="recent">
          <Card>RECENT</Card>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Layout;
