import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/Post/PostList";
import useGetAllPosts from "../../hooks/useGetAllPosts";
import { Grid, GridItem, Card, Text } from "@chakra-ui/react";
import { useCommunityStore } from "../../store/community-store";
import { Community } from "../../entities/Post";

const CommunityPage = () => {
  const { communityName } = useParams<{ communityName: string }>();
  const [community, setCommunity] = useState<Community>();
  const { recentCommunities } = useCommunityStore();
  const [sortDirection, setSortDirection] = useState("DESC");
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllPosts({
    pageSize: 12,
    communityName: communityName,
    sortDirection: sortDirection,
  });

  useEffect(() => {
    if (communityName) {
      const getCommunity = recentCommunities.find(
        (com) => com.communityName === communityName
      );
      setCommunity(getCommunity);
    }
  }, [communityName, recentCommunities]);

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
          isCommunity={true}
        />
      </GridItem>
      <GridItem area="right">
        <Card>
          <Text>{community?.communityName}</Text>
          <Text>{community?.description}</Text>
          <Text>{community?.communityId}</Text>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default CommunityPage;
