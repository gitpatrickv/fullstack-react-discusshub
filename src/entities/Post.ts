import PageResponse from "./PageResponse";
import { User } from "./User";

export interface PostUserInfo extends User {
  name: string;
}

export interface Community {
  communityId: number;
  communityName: string;
  description?: string;
  communityPhotoUrl?: string;
}

export interface Post {
  createdDate: string;
  postId: number;
  title: string;
  content: string;
  user: PostUserInfo;
  community: Community;
}

export interface GetAllPost {
  models: Post[];
  pageResponse: PageResponse;
}
