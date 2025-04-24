import { create } from "zustand";

interface UserStore {
  userId: number | null;
  username: string | null;
  picture: string | null;
  gender: string | null;
  role: string | null;
  setUserId: (id: number | null) => void;
  setUsername: (name: string | null) => void;
  setPicture: (picture: string | null) => void;
  setGender: (g: string | null) => void;
  setRole: (r: string | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  username: null,
  picture: null,
  gender: null,
  email: null,
  role: null,
  setUserId: (id: number | null) => set({ userId: id }),
  setUsername: (name: string | null) => set({ username: name }),
  setPicture: (picture: string | null) => set({ picture: picture }),
  setGender: (g: string | null) => set({ gender: g }),
  setRole: (r: string | null) => set({ role: r }),
  resetUser: () =>
    set({
      userId: null,
      username: null,
      picture: null,
      gender: null,
      role: null,
    }),
}));
