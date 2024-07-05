import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      setIsAuth: (isAuth) => set({ isAuth }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
