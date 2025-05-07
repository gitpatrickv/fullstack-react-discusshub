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
import { Post } from "../../entities/Post";
import useJoinCommunity from "../../hooks/useJoinCommunity";
import useGetAllCommunities from "../../Layout/hooks/useGetAllCommunities";
import { useAuthQueryStore } from "../../store/auth-store";
import { useCommunityStore } from "../../store/community-store";
import { usePostStore } from "../../store/post-store";
import MainButton from "../Button/MainButton";
import PostButtons from "./PostButtons";
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
  const { data: communities } = useGetAllCommunities();
  const { addRecentCommunity } = useCommunityStore();
  const { addRecentlyViewedPost } = usePostStore();
  const { mutate: joinCommunity } = useJoinCommunity(
    post.community.communityName
  );
  const handleNavigateClick = () => {
    navigate(
      `/community/${post.community.communityName}/post/${post.postId}/${formattedPostTitle}`
    );
    setTimeout(() => {
      addRecentlyViewedPost(post);
    }, 1000);
  };

  const handleNavigateCommunityClick = () => {
    navigate(`/community/${post.community.communityName}`);
    addRecentCommunity(post.community);
  };

  const handleNavigateProfileClick = () => {
    navigate(`/user/${post.user.username}`);
  };

  const alreadyJoined = communities
    ?.map((c) => c.communityId)
    .includes(post.community.communityId);

  return (
    <>
      <Divider mb="5px" mt="5px" />
      <Box
        px={3}
        py={2}
        cursor="pointer"
        _hover={{ bg: colorMode === "dark" ? "gray.700" : "#E0E0E0" }}
        transition="all 0.2s"
        borderRadius="lg"
        onClick={handleNavigateClick}
        position="relative"
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
          <Text
            fontWeight="semibold"
            _hover={{ color: "#165BB7" }}
            onClick={(e) => {
              e.stopPropagation();
              isCommunity
                ? handleNavigateProfileClick()
                : handleNavigateCommunityClick();
            }}
          >
            {isCommunity ? post.user.username : post.community.communityName}
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

        <PostButtons />

        {!isCommunity && !!jwtToken && !alreadyJoined && (
          <MainButton
            borderRadius="full"
            height="25px"
            position="absolute"
            top="3"
            right="3"
            onClick={(e) => {
              e.stopPropagation();
              joinCommunity();
            }}
          >
            <Text fontSize="sm">Join</Text>
          </MainButton>
        )}
      </Box>
    </>
  );
};
export default PostCard;
