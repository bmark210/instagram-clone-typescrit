import { FC, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constans/routes';
import { signOut } from 'firebase/auth';
import useUserStore from '../store/userStore';
import { User } from '../types/user';
import HomeIcon from './ui/icons/HomeIcon';
import CreateIcon from './ui/icons/CreateIcon';
import SettingsIcon from './ui/icons/SettingsIcon';
import OtherIcon from './ui/icons/OtherIcon';
import SignOutIcon from './ui/icons/SignOutIcon';

const Header: FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const [visible, setVisible] = useState(false);

  const handleSignOut = () => {
    signOut;
    logout();
    navigate(`${ROUTES.LOGIN}`, { replace: true });
  };

  const handleOthers = () => {
    setVisible(!visible);
  };

  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    const DEFAULT_IMAGE_PATH = '/images/default.png';
    target.src = DEFAULT_IMAGE_PATH;
  }

  return (
    <div className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            <>
              <Link title="Home" to={ROUTES.DASHBOARD}>
                <HomeIcon />
              </Link>
              <Link
                className={`${visible ? 'block' : 'hidden'}`}
                title="Create"
                to={ROUTES.CREATE}
              >
                <CreateIcon />
              </Link>
              <Link
                className={`${visible ? 'block' : 'hidden'}`}
                title="Settings"
                to={ROUTES.SETTINGS}
              >
                <SettingsIcon />
              </Link>
              <button type="button" title="Other" onClick={handleOthers}>
               <OtherIcon/>
              </button>
              <button type="button" title="Sign Out" onClick={handleSignOut}>
                <SignOutIcon/>
              </button>
              <div className="flex items-center cursor-pointer">
                <Link to={`/p/${user?.username}`}>
                  <img
                    title={user.username}
                    className="rounded-full h-8 w-8 flex"
                    src={
                      user.avatarUrl !== null
                        ? `${user.avatarUrl}`
                        : `/images/default.png`
                    }
                    alt={`${user?.username} profile`}
                    onError={handleImageError}
                  />
                </Link>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
