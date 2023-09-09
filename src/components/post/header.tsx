import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  username: string;
  avatarUrl: string | null;
}

const Header: FC<HeaderProps> = ({ username, avatarUrl }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3 object-cover"
            src={avatarUrl !== null ? `${avatarUrl}` : `/images/default.png`}
            alt={`${username} profile picture`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
