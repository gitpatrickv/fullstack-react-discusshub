import { Box, Select, Skeleton, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "../../components/Post/PostCard";
import useGetAllPosts from "../../hooks/useGetAllPosts";

const HomePage = () => {
  const array = [1, 2, 3, 4, 5, 6];
  const sort = [
    { name: "Latest", value: "DESC" },
    { name: "Oldest", value: "ASC" },
  ];

  const [sortDirection, setSortDirection] = useState("DESC");
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllPosts({
    pageSize: 12,
    sortDirection: sortDirection,
  });

  const handleSortDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortDirection(event.target.value);
    console.log(event.target.value);
  };

  const fetchData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  if (isLoading) {
    return (
      <>
        {array.map((skel) => (
          <Skeleton height="180px" mt="10px" key={skel} />
        ))}
      </>
    );
  }

  return (
    <Box padding={2}>
      <Select
        width="120px"
        onChange={handleSortDirectionChange}
        value={sortDirection}
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
          page.models.map((post) => <PostCard key={post.postId} post={post} />)
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default HomePage;
