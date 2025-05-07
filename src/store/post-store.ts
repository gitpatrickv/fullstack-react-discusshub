import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Post } from "../entities/Post";

interface PostStore {
  recentlyViewedPosts: Post[];
  addRecentlyViewedPost: (post: Post) => void;
  clearRecentlyViewedPost: () => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      recentlyViewedPosts: [],
      addRecentlyViewedPost: (post: Post) => {
        const { recentlyViewedPosts } = get();

        if (!recentlyViewedPosts.some((p) => p.postId === post.postId)) {
          if (recentlyViewedPosts.length < 6) {
            set({ recentlyViewedPosts: [...recentlyViewedPosts, post] });
          } else {
            set({
              recentlyViewedPosts: [...recentlyViewedPosts.slice(1), post],
            });
          }
        }
      },
      clearRecentlyViewedPost: () => {
        set({ recentlyViewedPosts: [] });
      },
    }),
    {
      name: "recent-post-view-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
