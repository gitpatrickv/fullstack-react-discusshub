import { create } from "zustand";

interface UserStore {
  email: string | null;
  username: string | null;
  picture: string | null;
  gender: string | null;
  setUsername: (name: string | null) => void;
  setPicture: (picture: string | null) => void;
  setGender: (g: string | null) => void;
  setEmail: (e: string | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  username: null,
  picture: null,
  gender: null,
  email: null,
  setUsername: (name: string | null) => set({ username: name }),
  setPicture: (picture: string | null) => set({ picture: picture }),
  setGender: (g: string | null) => set({ gender: g }),
  setEmail: (e: string | null) => set({ email: e }),
  resetUser: () =>
    set({
      username: null,
      picture: null,
      gender: null,
      email: null,
    }),
}));
