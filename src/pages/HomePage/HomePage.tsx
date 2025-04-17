import { useState } from "react";
import PostList from "../../components/Post/PostList";
import useGetAllPosts from "../../hooks/useGetAllPosts";
import { Card, Grid, GridItem, Text } from "@chakra-ui/react";

const HomePage = () => {
  const [sortDirection, setSortDirection] = useState("DESC");
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllPosts({
    pageSize: 12,
    communityName: "HOME",
    sortDirection: sortDirection,
  });

  return (
    <Grid templateColumns="0.7fr 0.3fr" templateAreas={`"left right"`} gap={4}>
      <GridItem area="left">
        <PostList
          data={data}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          isCommunity={false}
        />
      </GridItem>
      <GridItem area="right">
        <Card>
          <Text>RECENT</Text>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
