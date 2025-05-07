import { Card, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import PostList from "../../components/Post/PostList";
import useGetAllPosts from "../../hooks/useGetAllPosts";
import { usePostStore } from "../../store/post-store";
import RecentlyViewedPostCard from "./components/RecentlyViewedPostCard";

const HomePage = () => {
  const [sortDirection, setSortDirection] = useState("DESC");
  const { recentlyViewedPosts, clearRecentlyViewedPost } = usePostStore();
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
        {recentlyViewedPosts.length >= 1 && (
          <Card mt="10px">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              px={4}
              py={2}
            >
              <Text fontSize="lg" fontWeight="semibold">
                Just Viewed
              </Text>
              <Text
                color="#165BB7"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={clearRecentlyViewedPost}
              >
                Clear
              </Text>
            </Flex>
            {recentlyViewedPosts.map((post) => (
              <RecentlyViewedPostCard key={post.postId} post={post} />
            ))}
          </Card>
        )}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
