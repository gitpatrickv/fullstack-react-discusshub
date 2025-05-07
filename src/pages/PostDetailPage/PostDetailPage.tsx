import {
  Avatar,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../assets/profpic.jpeg";
import PostButtons from "../../components/Post/PostButtons";
import Comment from "./compoennts/Comment";
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
    <Grid templateColumns="0.7fr 0.3fr" templateAreas={`"left right"`} gap={4}>
      <GridItem area="left">
        <Box padding={3}>
          <Flex alignItems="center" gap={2} fontSize="sm" mt="10px">
            <Avatar src={pic} size="xs" />
            <Text>{post.user.username}</Text>
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
          <Textarea mt="10px" />
          <Comment />
        </Box>
      </GridItem>
      <GridItem area="right">
        <Card>TEST</Card>
      </GridItem>
    </Grid>
  );
};

export default PostDetailPage;
