import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user, profile) =>
    set({
      user,
      profile,
      isAuthenticated: Boolean(user && profile),
      isLoading: false,
    }),

  setProfile: (profile) =>
    set((state) => ({
      profile,
      isAuthenticated: Boolean(state.user && profile),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  clearAuth: () =>
    set({
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}))

export default useAuthStore
