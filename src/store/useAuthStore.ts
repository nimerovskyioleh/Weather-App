import { onAuthStateChanged, User } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../api/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});
