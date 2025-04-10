import { Avatar, Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../assets/profpic.jpeg";
import useGetOnePost from "./hooks/useGetOnePost";

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const { data: post, isLoading } = useGetOnePost(postId!);

  if (isLoading || !post) {
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    );
  }

  const time = new Date(post.createdDate);

  return (
    <Box padding={3}>
      <Flex alignItems="center" gap={2} fontSize="sm" mt="10px">
        <Avatar src={pic} size="xs" />
        <Text>{post.user.name}</Text>
        <Text>
          <ReactTimeAgo date={time} locale="en-US" />
        </Text>
      </Flex>
      <Text fontSize="xl" fontWeight="semibold" mt="5px">
        {post.title}
      </Text>
      <Text mt="5px">{post.content}</Text>
    </Box>
  );
};

export default PostDetailPage;
