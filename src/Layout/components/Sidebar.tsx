import { Box, Divider, Text, useColorMode } from "@chakra-ui/react";

import { useCommunityStore } from "../../store/community-store";
import useGetAllCommunities from "../hooks/useGetAllCommunities";
import CommunityCard from "./CommunityCard";
import CreateCommunityModal from "./CreateCommunityModal";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const { recentCommunities } = useCommunityStore();
  const { data } = useGetAllCommunities();
  return (
    <Box
      borderRadius="none"
      height="100%"
      padding={3}
      borderRight="1px solid"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      width="250px"
    >
      {recentCommunities.length >= 1 && (
        <>
          <Text fontSize="xl" fontWeight="semibold">
            Recent
          </Text>
          {[...recentCommunities].reverse().map((community) => (
            <CommunityCard key={community.communityId} community={community} />
          ))}
          <Divider
            border="1px solid"
            borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
            mt="10px"
            mb="10px"
          />
        </>
      )}

      <Text fontSize="xl" fontWeight="semibold">
        Communities
      </Text>
      <CreateCommunityModal />
      {data?.map((community) => (
        <CommunityCard key={community.communityId} community={community} />
      ))}
    </Box>
  );
};

export default Sidebar;
