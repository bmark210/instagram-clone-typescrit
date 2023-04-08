import { Routes, Route, Navigate } from 'react-router-dom';
import { FC, Suspense, lazy } from 'react';
import * as ROUTES from './constans/routes';
import InstagramLoading from './components/ui/InstagramLoading';
import useUserStore from './store/userStore';
import Header from './components/header';

const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const SignUp = lazy(() => import('./pages/signUp'));
const Profile = lazy(() => import('./pages/profile'));
const Create = lazy(() => import('./pages/create'));
const Settings = lazy(() => import('./pages/settings'));
const NotFound = lazy(() => import('./pages/notFound'));

const App: FC = () => {
  const user = useUserStore((state) => state.user);
  const userId = user?.userId ?? null;
  return (
    <Suspense fallback={<InstagramLoading />}>
      <div className="bg-gray-background">
        {user && <Header user={user} />}
        <Routes>
          <Route path={ROUTES.CREATE} element={<Create user={user} />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route
            path={ROUTES.NOTFOUND}
            element={<NotFound userId={userId} />}
          />
          <Route path="*" element={<Navigate replace to={ROUTES.NOTFOUND} />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
