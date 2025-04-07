import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Community } from "../entities/Post";

interface CommunityStore {
  communities: Community[];
  addCommunity: (community: Community) => void;
  clearCommunities: () => void;
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set, get) => ({
      communities: [],
      addCommunity: (community: Community) => {
        const { communities } = get();

        if (!communities.some((c) => c.communityId === community.communityId)) {
          if (communities.length < 5) {
            set({ communities: [...communities, community] });
          } else {
            set({ communities: [...communities.slice(1), community] });
          }
        }
      },
      clearCommunities: () => {
        set({ communities: [] });
      },
    }),
    {
      name: "community-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
