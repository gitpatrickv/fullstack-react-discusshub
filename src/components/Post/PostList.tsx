import { Box, Center, Select, Spinner } from "@chakra-ui/react";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetAllPost } from "../../entities/Post";
import PostCard from "./PostCard";

interface Props {
  data: InfiniteData<GetAllPost> | undefined;
  isLoading: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<GetAllPost>, Error>
  >;
  hasNextPage: boolean | undefined;
  sortDirection: string;
  setSortDirection: (value: string) => void;
  isCommunity: boolean;
}

const PostList = ({
  data,
  isLoading,
  fetchNextPage,
  hasNextPage,
  sortDirection,
  setSortDirection,
  isCommunity,
}: Props) => {
  const sort = [
    { name: "Latest", value: "DESC" },
    { name: "Oldest", value: "ASC" },
  ];

  const handleSortDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortDirection(event.target.value);
  };

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
      <Select
        width="120px"
        onChange={handleSortDirectionChange}
        value={sortDirection}
        borderRadius="none"
      >
        {sort.map((value) => (
          <option key={value.value} value={value.value}>
            {value.name}
          </option>
        ))}
      </Select>

      <InfiniteScroll
        dataLength={fetchData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        {data?.pages.map((page) =>
          page.models.map((post) => (
            <PostCard key={post.postId} post={post} isCommunity={isCommunity} />
          ))
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default PostList;
