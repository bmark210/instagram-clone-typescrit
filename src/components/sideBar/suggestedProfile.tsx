import { FC, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toggleFollow } from '../../utils/firebase';
import useUserStore from '../../store/userStore';

interface SuggestedProfileProps {
  username: string;
  avatarUrl: string | null;
  userId: string;
}

const SuggestedProfile: FC<SuggestedProfileProps> = ({
  username,
  avatarUrl,
  userId,
}) => {
  const [followed, setFollowed] = useState(false);
  const { user, updateFollowings } = useUserStore();
  const idOfCurrentUser = user ? user.userId : null;
  async function handleFollowUser() {
    if (idOfCurrentUser && userId) {
      setFollowed(true);
      await toggleFollow(idOfCurrentUser, userId);
      updateFollowings(userId);
    }
  }
  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    const DEFAULT_IMAGE_PATH = 'images/default.png';
    target.src = DEFAULT_IMAGE_PATH;
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <Link to={`/p/${username}`}>
        <div className="flex items-center justify-between">
          <img
            className="rounded-full w-8 h-8 flex mr-3"
            src={avatarUrl !== null ? `${avatarUrl}` : `images/default.png`}
            alt={`${username}'s avatar`}
            onError={handleImageError}
          />

          <p className="font-bold text-sm">{username}</p>
        </div>
      </Link>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};
export default SuggestedProfile;
