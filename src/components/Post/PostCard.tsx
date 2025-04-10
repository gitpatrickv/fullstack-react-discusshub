import {
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import comPic from "../../assets/comunity.png";
import pic from "../../assets/profpic.jpeg";
import { Community, Post } from "../../entities/Post";
import { useAuthQueryStore } from "../../store/auth-store";
import { useCommunityStore } from "../../store/community-store";
import MainButton from "../Button/MainButton";
interface Props {
  post: Post;
  isCommunity: boolean;
}

const PostCard = ({ post, isCommunity }: Props) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { colorMode } = useColorMode();
  const time = new Date(post.createdDate);
  const formattedPostTitle = post.title
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[/ ]/g, "_");

  const navigate = useNavigate();
  const { addCommunity } = useCommunityStore();

  const handleNavigateClick = (community: Community) => {
    navigate(
      `/${post.community.communityName}/post/${post.postId}/${formattedPostTitle}`
    );
    addCommunity(community);
  };

  return (
    <Box position="relative">
      <Divider mb="5px" mt="5px" />
      <Box
        px={3}
        py={2}
        cursor="pointer"
        _hover={{ bg: colorMode === "dark" ? "gray.700" : "#E0E0E0" }}
        transition="all 0.2s"
        borderRadius="lg"
        onClick={() => handleNavigateClick(post.community)}
      >
        <Flex alignItems="center" gap={2} fontSize="sm">
          {isCommunity ? (
            <Avatar src={post.user.photoUrl || pic} size="xs" />
          ) : (
            <Avatar
              src={post.community.communityPhotoUrl || comPic}
              size="xs"
            />
          )}
          <Text fontWeight="semibold">
            {isCommunity ? post.user.name : post.community.communityName}
          </Text>
          <Text fontSize="xl">·</Text>
          <Text>
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
        </Flex>
        <Text fontSize="xl" fontWeight="semibold" mt="5px">
          {post.title}
        </Text>
        <Text mt="5px">{post.content}</Text>
      </Box>
      {!isCommunity && !!jwtToken && (
        <MainButton
          borderRadius="full"
          height="25px"
          position="absolute"
          top="4"
          right="4"
        >
          <Text fontSize="sm">Join</Text>
        </MainButton>
      )}
    </Box>
  );
};
export default PostCard;
