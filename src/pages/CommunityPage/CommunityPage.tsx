import { Center, Spinner, Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "../../components/Post/PostCard";
import useGetAllPosts from "../../hooks/useGetAllPosts";
import { useParams } from "react-router-dom";

const CommunityPage = () => {
  const params = useParams<{ communityName: string }>();
  const communityName = params.communityName;
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllPosts({
    pageSize: 12,
    communityName: communityName,
  });

  const fetchData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box padding={2}>
      <InfiniteScroll
        dataLength={fetchData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        {data?.pages.map((page) =>
          page.models.map((post) => <PostCard key={post.postId} post={post} />)
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default CommunityPage;
