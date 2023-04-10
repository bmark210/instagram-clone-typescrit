import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constans/routes';
import useUserStore from '../store/userStore';
import { User } from '../types/user';
import Timeline from '../components/timeline';
import SideBar from '../components/sideBar';

const Dashboard: FC = () => {
  const user: User | null = useUserStore((state) => state.user);
  useEffect(() => {
    document.title = 'Intsagram';
  }, []);

  if (user === null) return <Navigate to={ROUTES.LOGIN} />;
  return (
    <>
      <div className="bg-gray-background">
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline user={user} />
          <SideBar user={user} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
