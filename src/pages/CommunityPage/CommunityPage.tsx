import { useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/Post/PostList";
import useGetAllPosts from "../../hooks/useGetAllPosts";

const CommunityPage = () => {
  const { communityName } = useParams<{ communityName: string }>();
  const [sortDirection, setSortDirection] = useState("DESC");
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllPosts({
    pageSize: 12,
    communityName: communityName,
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
      isCommunity={true}
    />
  );
};

export default CommunityPage;
