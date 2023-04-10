import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import produce from 'immer';
import { User } from '../types/user';

interface UserStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateAvatar: (newAvatarUrl: string) => void;
  updateFollowings: (newFollowing: string) => void;
  removeFollowing: (followingId: string) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    devtools((set) => ({
      user: null,
      login: (userData) =>
        set(
          produce((draft) => {
            draft.user = userData;
          })
        ),
      logout: () =>
        set(
          produce((draft) => {
            draft.user = null;
          })
        ),
      updateAvatar: (newAvatarUrl) =>
        set(
          produce((draft) => {
            if (draft.user) {
              draft.user.avatarUrl = newAvatarUrl;
            }
          })
        ),
      updateFollowings: (newFollowing) =>
        set(
          produce((draft) => {
            if (draft.user) {
              draft.user.following.push(newFollowing);
            }
          })
        ),
      removeFollowing: (followingId: string) =>
        set(
          produce((draft) => {
            if (draft.user) {
              draft.user.following.filter((f: string) => f !== followingId);
            }
          })
        ),
    })),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
