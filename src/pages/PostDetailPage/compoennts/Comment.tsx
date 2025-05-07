import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import PostButtons from "../../../components/Post/PostButtons";

const Comment = () => {
  const time = new Date();
  return (
    <>
      <Flex alignItems="center" gap={2} fontSize="sm" mt="10px">
        <Avatar src={pic} size="xs" />
        <Text>username</Text>
        <Text fontSize="xl">·</Text>
        <Text>
          <ReactTimeAgo date={time} locale="en-US" />
        </Text>
      </Flex>
      <Box ml="32px">
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
          recusandae laudantium iusto accusantium modi. Repudiandae debitis
          voluptas quisquam iste a obcaecati natus blanditiis mollitia quae,
          optio ipsa deleniti! Asperiores, recusandae.
        </Text>
        <PostButtons />
      </Box>
    </>
  );
};

export default Comment;
