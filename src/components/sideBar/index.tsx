import { FC } from 'react';
import UserForm from './user';
import Suggestions from './suggestions';
import { User } from '../../models/user';

interface SideBarProps {
  user: User;
}

const SideBar: FC<SideBarProps> = ({ user }) => {

  return (
    <div className="p-4">
      <UserForm user={user} />
      <Suggestions user={user} />
    </div>
  );
};

export default SideBar;
