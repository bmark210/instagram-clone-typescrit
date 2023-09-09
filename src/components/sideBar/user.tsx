import { FC, SyntheticEvent, memo } from 'react';
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';
import { User } from '../../types/user';

interface UserFormProps {
  user: User;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    const DEFAULT_IMAGE_PATH = 'images/default.png';
    target.src = DEFAULT_IMAGE_PATH;
  }

  return !user ? (
    <ContentLoader
      speed={2}
      width={64}
      height={64}
      viewBox="0 0 64 64"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="32" cy="32" r="32" />
    </ContentLoader>
  ) : (
    
    <Link
      to={`/p/${user.username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full object-cover w-16 h-16 flex min-w-full"
          src={
            user.avatarUrl !== null
              ? `${user.avatarUrl}`
              : `/images/default.png`
          }
          alt="avatar"
          onError={handleImageError}
        />
      </div>
      <div className="col-span-2">
        <p className="font-bold text-sm">{user.username}</p>
        <p className="text-sm">{user.fullName}</p>
      </div>
    </Link>
  );
};

export default UserForm;