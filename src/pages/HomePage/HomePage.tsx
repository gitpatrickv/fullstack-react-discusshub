import { useState } from "react";
import PostList from "../../components/Post/PostList";
import useGetAllPosts from "../../hooks/useGetAllPosts";

const HomePage = () => {
  const [sortDirection, setSortDirection] = useState("DESC");
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllPosts({
    pageSize: 12,
    sortDirection: sortDirection,
  });

  return (
    <PostList
      data={data}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
      isCommunity={false}
    />
  );
};

export default HomePage;
