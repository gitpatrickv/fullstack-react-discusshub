import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import comPic from "../../../assets/comunity.png";
import { Post } from "../../../entities/Post";
import { useCommunityStore } from "../../../store/community-store";
interface Props {
  post: Post;
}

const RecentlyViewedPostCard = ({ post }: Props) => {
  const { colorMode } = useColorMode();
  const formattedPostTitle = post.title
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[/ ]/g, "_");
  const { addRecentCommunity } = useCommunityStore();
  const navigate = useNavigate();
  const handleNavigateCommunityClick = () => {
    navigate(`/community/${post.community.communityName}`);
    addRecentCommunity(post.community);
  };

  const handleNavigateClick = () => {
    navigate(
      `/community/${post.community.communityName}/post/${post.postId}/${formattedPostTitle}`
    );
  };

  return (
    <>
      <Box
        padding={4}
        onClick={handleNavigateClick}
        cursor="pointer"
        _hover={{ bg: colorMode === "dark" ? "#181818" : "#F8F8F8" }}
      >
        <Flex gap={2} alignItems="center">
          <Avatar src={post.community.communityPhotoUrl || comPic} size="xs" />
          <Text
            _hover={{ textDecoration: "underline", color: "#165BB7" }}
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigateCommunityClick();
            }}
          >
            {post.community.communityName}
          </Text>
        </Flex>
        <Text
          mt="5px"
          fontWeight="semibold"
          cursor="pointer"
          onClick={handleNavigateClick}
          _hover={{ textDecoration: "underline" }}
        >
          {post.title}
        </Text>
      </Box>
      <Divider borderColor={colorMode === "dark" ? "gray.800" : "gray.200"} />
    </>
  );
};

export default RecentlyViewedPostCard;
