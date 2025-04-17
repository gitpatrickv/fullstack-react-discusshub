import PageResponse from "./PageResponse";

export interface PostUserInfo {
  userId: number;
  username: string;
  photoUrl?: string;
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
