import { lazy } from 'react';
import * as PATHS from '../constans/routes';

const Login = lazy(() => import('../pages/login'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const SignUp = lazy(() => import('../pages/signUp'));
const Profile = lazy(() => import('../pages/profile'));
const Create = lazy(() => import('../pages/create'));
const Settings = lazy(() => import('../pages/settings'));
const NotFound = lazy(() => import('../pages/notFound'));

interface Route {
  path: string;
  component: React.LazyExoticComponent<React.FC>;
}

export const ROUTES = {
  CREATE: <Route>{
    path: PATHS.CREATE,
    component: Create,
  },
  SETTINGS: <Route>{
    path: PATHS.SETTINGS,
    component: Settings,
  },
  PROFILE: <Route>{
    path: PATHS.PROFILE,
    component: Profile,
  },
  LOGIN: <Route>{
    path: PATHS.LOGIN,
    component: Login,
  },
  DASHBOARD: <Route>{
    path: PATHS.DASHBOARD,
    component: Dashboard,
  },
  SIGN_UP: <Route>{
    path: PATHS.SIGN_UP,
    component: SignUp,
  },
  NOTFOUND: <Route>{
    path: PATHS.NOTFOUND,
    component: NotFound,
  },
};
