import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  jwtToken: string;
}

interface AuthQueryStore {
  authStore: AuthStore;
  setJwtToken: (jwtToken: string) => void;
  logout: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAuthQueryStore = create<AuthQueryStore>()(
  persist(
    (set) => ({
      authStore: {
        jwtToken: localStorage.getItem("jwtToken") || "",
      },
      setJwtToken: (jwtToken) => {
        localStorage.setItem("jwtToken", jwtToken);
        set((state) => ({ authStore: { ...state.authStore, jwtToken } }));
      },

      logout: () => {
        localStorage.removeItem("jwtToken");
        set((state) => ({ authStore: { ...state.authStore, jwtToken: "" } }));
      },
      isOpen: false,
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
