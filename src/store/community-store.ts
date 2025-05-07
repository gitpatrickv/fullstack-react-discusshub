import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Community } from "../entities/Post";

interface CommunityStore {
  recentCommunities: Community[];
  addRecentCommunity: (community: Community) => void;
  clearCommunities: () => void;
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set, get) => ({
      recentCommunities: [],
      addRecentCommunity: (community: Community) => {
        const { recentCommunities } = get();

        if (
          !recentCommunities.some(
            (c) => c.communityId === community.communityId
          )
        ) {
          if (recentCommunities.length < 5) {
            set({ recentCommunities: [...recentCommunities, community] });
          } else {
            set({
              recentCommunities: [...recentCommunities.slice(1), community],
            });
          }
        }
      },
      clearCommunities: () => {
        set({ recentCommunities: [] });
      },
    }),
    {
      name: "recent-community-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
