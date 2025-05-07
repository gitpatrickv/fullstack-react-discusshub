import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import comPic from "../../assets/comunity.png";
import { Community } from "../../entities/Post";
import { useCommunityStore } from "../../store/community-store";
interface Props {
  community: Community;
}

const CommunityCard = ({ community }: Props) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { addRecentCommunity } = useCommunityStore();
  const handleNavigateClick = (name: string) => {
    navigate(`community/${name}`);
    addRecentCommunity(community);
  };
  return (
    <Flex
      alignItems="center"
      gap={2}
      mt="5px"
      cursor="pointer"
      _hover={{ bg: colorMode === "dark" ? "gray.700" : "#E0E0E0" }}
      transition="all 0.2s"
      borderRadius="lg"
      padding={2}
      key={community.communityId}
      onClick={() => handleNavigateClick(community.communityName)}
    >
      <Avatar src={community.communityPhotoUrl || comPic} size="sm" />
      <Text fontWeight="semibold">{community.communityName}</Text>
    </Flex>
  );
};

export default CommunityCard;
