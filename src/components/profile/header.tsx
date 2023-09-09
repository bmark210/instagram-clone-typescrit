import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { User } from '../../types/user';
import useUserStore from '../../store/userStore';
import {
  isUserFollowingProfile,
  toggleFollow,
  toggleUnfollow,
} from '../../db/firebase';

interface HeaderProps {
  photosCount: number;
  followers: string[];
  profile: User;
}

const Header: FC<HeaderProps> = ({ photosCount, followers, profile }) => {
  const { user, removeFollowing, updateFollowings } = useUserStore();
  const [followerCount, setFollowerCount] = useState<number>(followers.length);
  const [isFollowingProfile, setIsFollowingProfile] = useState<boolean | null>(
    null
  );
  const activeBtnFollow = profile?.username !== user?.username;

  const handleToggleFollow = useCallback(async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount((followerCount) =>
      isFollowingProfile ? followerCount - 1 : followerCount + 1
    );
    if (!isFollowingProfile && user) {
      await toggleFollow(user.userId, profile.userId);
      updateFollowings(profile.userId);
    } else if (isFollowingProfile && user) {
      await toggleUnfollow(user.userId, profile.userId);
      removeFollowing(profile.userId);
    }
  }, [isFollowingProfile, user, profile]);

  useEffect(() => {
    async function checkIsFollowing() {
      if (!user || !profile.userId) return;
      const isFollowing = await isUserFollowingProfile(
        user.userId,
        profile.userId
      );
      setIsFollowingProfile(isFollowing);
    }
    checkIsFollowing();
  }, [user, profile.userId]);

  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    const DEFAULT_IMAGE_PATH = '../images/default.png';
    target.src = DEFAULT_IMAGE_PATH;
  }

  return (
    <div className="grid grid-cols-3 my-12 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profile.username ? (
          <img
            className="rounded-full object-cover h-40 w-40"
            alt={`${profile.fullName} profile picture`}
            src={
              profile.avatarUrl !== null
                ? `${profile.avatarUrl}`
                : `../images/default.png`
            }
            onError={handleImageError}
          />
        ) : (
          <ContentLoader viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="75" />
          </ContentLoader>
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          {activeBtnFollow && isFollowingProfile === null ? (
            <ContentLoader
              speed={2}
              width={80}
              height={32}
              viewBox="0 0 80 32"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="80" height="32" />
            </ContentLoader>
          ) : (
            activeBtnFollow && (
              <button
                className="bg-blue-primary font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!profile.folowers || !profile.following ? (
            <ContentLoader viewBox="0 0 677 24">
              <rect x="0" y="0" width="677" height="24" />
            </ContentLoader>
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> posts
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {followerCount === 1 ? ` follower` : ` folowers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile.following?.length}</span>{' '}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile.fullName ? (
              <ContentLoader viewBox="0 0 677 24">
                <rect x="0" y="0" width="677" height="24" />
              </ContentLoader>
            ) : (
              profile.fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Header;
