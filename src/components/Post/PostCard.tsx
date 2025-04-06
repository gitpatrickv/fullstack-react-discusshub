import {
  Avatar,
  Box,
  Divider,
  Flex,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import pic from "../../assets/profpic.jpeg";
import { Post } from "../../entities/Post";
import { useNavigate } from "react-router-dom";
interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const { colorMode } = useColorMode();
  const time = new Date(post.createdDate);
  const formattedPostTitle = post.title
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[/ ]/g, "_");

  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(
      `/${post.community.communityName}/post/${post.postId}/${formattedPostTitle}`
    );
  };

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
      >
        <Flex alignItems="center" gap={2} fontSize="sm">
          <Avatar src={pic} size="xs" />
          <Text>{post.user.name}</Text>
          <Text>
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
          <Spacer />
          <Text>{post.community.communityName}</Text>
        </Flex>
        <Text fontSize="xl" fontWeight="semibold" mt="5px">
          {post.title}
        </Text>
        {/* <Text mt="5px" noOfLines={4}>
          {post.content}
        </Text> */}
        <Text mt="5px">{post.content}</Text>
      </Box>
    </>
  );
};
export default PostCard;
